import { IRedacao } from "../../models/Redacao.model";
import { CriteriosAvaliacaoService } from "../CriteriosAvaliacao/CriteriosAvaliacao.service";
import { DbCriteriosAvaliacaoRepository } from "../CriteriosAvaliacao/repository/CriteriosAvaliacao.repository";
import { ICriteriosAvaliacaoRepository } from "../CriteriosAvaliacao/repository/CriteriosAvaliacao.repository.interface";
import { IAService } from "../IA/IA.service";
import { ChatCompletionMessage } from "../IA/IA.service.type";
import { DbTemaRepository } from "../Tema/repository/Tema.repository";
import { ITemaRepository } from "../Tema/repository/Tema.repository.interface";
import { TemaService } from "../Tema/Tema.service";
import { CreateRedacaoData } from "./Redacao.validator";
import { DbRedacaoRepository } from "./repository/Redacao.repository";
import { IRedacaoRepository } from "./repository/Redacao.repository.interface";
import { DbRedacaoItemCriterioAvaliacaoRepository } from "./repository/RedacaoItemCriterioAvaliacao.repository";
import { IRedacaoItemCriterioAvaliacaoRepository } from "./repository/RedacaoItemCriterioAvaliacao.repository.interface";
import { PaymentService } from './../Payment/Payment.service';

export class RedacaoService {
    private redacaoRepository: IRedacaoRepository;
    private criterioAvaliacaoService: CriteriosAvaliacaoService;
    private redacaoItemCriterioAvaliacaoRepository: IRedacaoItemCriterioAvaliacaoRepository;
    private temaService: TemaService;
    private iaService: IAService;
    private readonly redacaoPromt = 
`Atue como um professor altamente capacitado em Língua Portuguesa e Redação, com vasta experiência em correção de textos e domínio profundo das normas gramaticais, coesão, coerência e argumentação. Sua tarefa é corrigir uma redação com base em critérios específicos de avaliação, que serão fornecidos em um JSON contendo: Os critérios de avaliação e seus respectivos itens detalhados. O tema da redação. Os textos de apoio do tema da redação. O texto da redação a ser corrigido. Sua correção deve ser extremamente detalhada, precisa e completa, avaliando todos os aspectos do texto com profundidade. A saída da sua resposta deve ser minuciosa, sem quebras de linha ou espaços extras desnecessários, e todos os textos devem ser envolvidos em código HTML para garantir a correta formatação.

### Instruções para a correção:
1. **Nota final:** A nota da redação deve ser atribuída de **0 a 1000** pontos, calculada proporcionalmente à soma das notas dos critérios de avaliação.
2. **Notas por critério:** Cada critério deve ter uma nota individual, distribuída de forma justa. Se há **4 critérios**, cada um deve valer **até 250 pontos**; se há **2 critérios**, cada um vale **até 500 pontos**, e assim por diante.
3. **Comentário detalhado:** Inclua um **comentário extenso e minucioso**, avaliando os pontos positivos e negativos da redação. Analise profundamente os aspectos linguísticos, estruturais e argumentativos, sempre justificando suas observações e fornecendo sugestões de melhoria.
4. **Pontos de atenção:** Liste **diversos pontos de atenção**, cada um contendo:
   - Um **nome** descritivo.
   - Uma **descrição detalhada** do problema identificado.
   - Um **texto explicativo sobre como melhorar** esse aspecto específico.

### Diretrizes para tornar a correção mais útil e detalhada:
- **Seja extremamente minucioso em cada aspecto da correção.** Analise profundamente a estrutura argumentativa, o desenvolvimento das ideias, a coesão e coerência do texto, a gramática, ortografia, pontuação e a adequação ao tema.
- **Explicite os pontos positivos** da redação, indicando o que foi bem executado e por quê. Isso ajudará a reforçar boas práticas do candidato.
- O Texto do comentário deve vir em formato HTML em tags <p>
- Faça vários pontos de atenção, e seja bem descritivo nelas
- **Destaque as falhas e os problemas**, explicando com exemplos onde a redação pode melhorar e fornecendo instruções claras sobre como corrigir os erros.
- **Use um tom claro, objetivo e instrutivo.** A ideia é que a correção sirva como um guia para que o autor compreenda exatamente o que precisa ser aprimorado.
- **Garanta que cada aspecto seja avaliado com profundidade, sem economizar palavras ou explicações.** Quanto mais detalhado for o feedback, mais útil será para o candidato. 
Formato JSON: {\"comentario\":\"\",\"items_criterios_avaliacao\":[{\"id\":\"\",\"nota\":001}],\"items_atencao\":[{\"nome\":\"\",\"descricao\":\"\",\"como_melhorar\":\"\"}]}`;
    constructor() {
        this.redacaoRepository = new DbRedacaoRepository();
        this.criterioAvaliacaoService = new CriteriosAvaliacaoService();
        this.redacaoItemCriterioAvaliacaoRepository = new DbRedacaoItemCriterioAvaliacaoRepository();
        this.temaService = new TemaService();
        this.iaService = new IAService();
        this.paymentService = new PaymentService();
    }

    create(data: Omit<IRedacao, 'id'>) {
        return this.redacaoRepository.create(data)
    }


    async getById(id: string): Promise<IRedacao> {
        const redacao = await this.redacaoRepository.getById(id);

        if (redacao) {

            if (redacao.criterios_avaliacao_id) {
                redacao.criterio_avaliacao = await this.criterioAvaliacaoService.getById(redacao.criterios_avaliacao_id);
                
                if(redacao.finished){
                    const notasItemCriterioAvaliacao = await this.redacaoItemCriterioAvaliacaoRepository.filter({redacoes_id: redacao.id});

                    redacao.criterio_avaliacao!.items_criterios_avaliacao = redacao.criterio_avaliacao?.items_criterios_avaliacao?.map((itemCriterio) => {
                        return {
                            ...itemCriterio,
                            nota: notasItemCriterioAvaliacao?.find((nota) => nota.items_criterios_avaliacao_id == itemCriterio.id)?.nota
                        }
                    })
                }
            }

            if (redacao.temas_id) {
                redacao.tema = await this.temaService.getById(redacao.temas_id);
                redacao.tema!.textos_tema = await this.temaService.getTextosTemaByTemaId(redacao.temas_id);
            }

        }

        return redacao as IRedacao;
    }

    async update(id: string, data: Partial<IRedacao>) {
        return await this.redacaoRepository.update(id, data);
    }

    async toCorrect(id: string) {
        const messageToChat: ChatCompletionMessage[] = [
            {
                content: this.redacaoPromt,
                role: `user`
            },
            {
                content: JSON.stringify(await this.getById(id)),
                role: `user`
            }
        ]

        const responseIa = JSON.parse(await this.iaService.chatCompletion(messageToChat));
        const nota = responseIa.items_criterios_avaliacao.reduce((acc,item) => item.nota + acc, 0);

        this.redacaoRepository.update(id, {
            comentario: responseIa.comentario,
            nota,
            finished: true
        })

        responseIa.items_criterios_avaliacao.forEach((itemCriterio) => {
            this.redacaoItemCriterioAvaliacaoRepository.create({
                items_criterios_avaliacao_id: itemCriterio.id,
                redacoes_id: id,
                nota:itemCriterio.nota
            }, false)
        });
    }
}