# PRD - Planner Diário Estoico

## 1. Visão Geral
**Nome do Produto:** Planner Diário Estoico

**Objetivo Principal:** Criar um aplicativo diário que una um planner de compromissos com um diário pessoal baseado em princípios estoicos, promovendo gratidão, foco e resiliência.

**Métrica de Sucesso:** Retenção de usuários em 30 e 90 dias, taxa de engajamento diário com o ritual 3-1-3 e ativação de lembretes estoicos.

## 2. Problema a Resolver
Usuários buscam sair do estado de reclamação, dispersão e ansiedade reativa, mas não possuem um fluxo diário simples que combine reflexão pessoal com gestão prática da rotina.

## 3. Público-Alvo
**O Buscador de Relevância:**
- Busca sentido, impacto e disciplina.
- Quer uma âncora diária em vez de distrações superficiais.
- Precisa de uma rotina que una prática e reflexão sem sobrecarregar.

## 4. Solução
Um app que entrega:
- onboarding cinematográfico e emocional,
- ritual diário 3-1-3 (3 gratidões, 1 objetivo do dia, 3 pontos de melhoria),
- agenda/compromissos diária integrada,
- lembretes estoicos estratégicos,
- fluxo sem conta e com foco em privacidade.

### Estado Atual do Projeto
- Frontend em React + TypeScript com Vite.
- Tela de onboarding (`src/components/Onboarding.tsx`) com imagem de fundo, frase estoica e CTA de início.
- Tela de transição/introduction (`IntroScreen`) com texto motivacional antes do dashboard.
- Dashboard (`src/components/Dashboard.tsx`) com ritual 3-1-3, compromissos diários e botão de ativação de lembretes.
- Navegação de fluxo simples no `src/App.tsx`: onboarding → intro → dashboard.
- Dependências já presentes: `react`, `vite`, `tailwindcss`, `motion`, `lucide-react`.

## 5. Escopo
### In-Scope
- Onboarding de boas-vindas com imagem/vídeo de alto impacto e texto inspirador.
- Tela de introdução com mensagem estoica e CTA para iniciar.
- Dashboard diário com:
  - seção de lembretes com botão de ativação,
  - ritual 3-1-3 com campos para preenchimento,
  - agenda de compromissos com adição de itens,
  - navegação inferior para acesso rápido.
- Conteúdo visual de alta qualidade com atmosfera premium.
- Experiência inicial sem necessidade de registro.

### Out-of-Scope
- Integração com calendários corporativos avançados (Outlook, Google Calendar complexos).
- Feed social, compartilhamento público ou elementos de rede social.
- Gamificação complexa (moedas, placares, ranking).
- Autenticação obrigatória ou contas multiusuário na versão MVP.

## 6. Requisitos Funcionais
- **RF01 - Onboarding de Alto Impacto:** O app deve exibir uma introdução visual e textual cinematográfica no primeiro acesso, explicando a proposta e a jornada estoica.
- **RF02 - Tela de Transição Motivacional:** O app deve apresentar uma tela intermediária de apresentação (intro) com mensagem inspiradora antes de liberar o dashboard.
- **RF03 - Ritual 3-1-3:** O app deve permitir ao usuário registrar diariamente:
  - 3 motivos de gratidão,
  - 1 alvo/objetivo central do dia,
  - 3 pontos de melhoria ou reflexão noturna.
- **RF04 - Planner de Compromissos:** O app deve fornecer uma lista de compromissos/agenda diária com horários e itens de ação, permitindo adicionar novos compromissos.
- **RF05 - Motor de Lembretes:** O app deve oferecer mecanismo para ativar lembretes estoicos diários e avisar o usuário em momentos estratégicos.
- **RF06 - Fluxo sem Conta:** O app deve funcionar sem exigir cadastro ou login para a primeira experiência, garantindo baixo atrito.
- **RF07 - Navegação Clara:** O app deve apresentar navegação inferior simples com acesso a seções principais (hoje, histórico/registros, foco, ajustes).

## 7. Requisitos Não Funcionais
- **RNF01 - Excelência Audiovisual:** As imagens e vídeos usados no onboarding e na interface devem ter aparência premium, resultando em uma sensação de produto aspiracional.
- **RNF02 - Revisão Gramatical:** Todo texto deve estar em português correto, sem erros de ortografia ou concordância.
- **RNF03 - Performance:** O aplicativo deve carregar as telas de onboarding e dashboard de forma rápida, com tempo de resposta ideal abaixo de 1,5s.
- **RNF04 - Privacidade e Simplicidade:** O aplicativo deve oferecer experiência sem conta, reduzindo a fricção inicial e respeitando a privacidade do usuário.
- **RNF05 - Responsividade:** A interface deve permanecer legível e utilizável em diferentes larguras de tela, priorizando mobile e tablet.

## 8. Critérios de Aceitação
- O usuário consegue iniciar o app e ver a tela de onboarding com imagem/vídeo e frase.
- O usuário consegue avançar para a tela de intro e então acessar o dashboard.
- O usuário consegue preencher os campos do ritual 3-1-3 diretamente no dashboard.
- O usuário consegue visualizar a agenda diária e acionar a adição de um novo compromisso.
- O usuário encontra o botão de ativar lembretes e entende a função dele.
- O app carrega o dashboard sem travamentos e com transições suaves.

## 9. Dependências e Premissas
- Premissa: o usuário aceita ativar notificações/alertas estoicos.
- Dependência: curadoria prévia de conteúdo estoico de alta qualidade (frases, imagens, vídeos).
- Dependência: design visual sofisticado e texturas de fundo compatíveis com a proposta premium.

## 10. Observações de Implementação
- A versão inicial deve priorizar a experiência de fluxo único: onboarding → intro → dashboard.
- Botões, navegação e textos devem ser minimalistas e alinhados ao tom estoico.
- A agenda diária pode ser apresentada inicialmente como lista fixa de compromissos com possibilidade de expansão futura.

## 11. Caminho do Arquivo
Arquivo salvo em: `./tasks/prd-planner-diario-estoico/prd.md`
