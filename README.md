# Boas-vindas ao repositório do projeto Star Wars Planets Search!

<details>
  <summary><strong>👨‍💻 O que deverá ser desenvolvido</strong></summary><br />

  Você vai desenvolver uma lista com filtros de planetas do universo Star Wars usando **Context API e Hooks** para controlar os estados globais.

</details>

<details>
  <summary><strong>:memo: Habilidades</strong></summary><br />

  Neste projeto, você irá:

  * Utilizar a _Context API_ do **React** para gerenciar estado.
  * Utilizar o _React Hook useState_.
  * Utilizar o _React Hook useContext_.
  * Utilizar o _React Hook useEffect_.
  * Criar _React Hooks_ customizados.
  * Escrever testes para garantir que sua aplicação tenha uma boa cobertura de testes.

</details>

# Orientações

<details>
  <summary><strong>‼️ Antes de começar a desenvolver</strong></summary><br />

  1. Instale as dependências

  - `npm install`.

</details>

# Requisitos

---

## 1 – Faça uma requisição para o endpoint `/planets` da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos dados da coluna `residents`

<details><summary> A tabela deve ser renderizada por um componente chamado <code>Table</code>:</summary>

  - Você deve apagar a coluna `residents` de cada planeta antes de salvar os dados recebidos da API no contexto.
  - A requisição deve ser feita em um componente separado do componente da tabela.
  - A API a ser consultada está [neste link](https://swapi.dev/api/planets). Você deverá fazer um fetch para a URL `https://swapi.dev/api/planets`.
  - A primeira linha da tabela deve conter os headers de cada coluna. As demais linhas serão as informações de cada planeta recebido da API.
</details>

---

## 2 – Crie um filtro de texto para a tabela
<details><summary> A tabela deve ser atualizada com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter de apertar um botão para efetuar a filtragem. Por exemplo, se for digitado "Tatoo" no campo de texto, o planeta "Tatooine" deve ser exibido, como demonstrado na <b>ilustração</b>:</summary>

<details><summary>Observações técnicas</summary>

  - O campo de texto deve possuir a propriedade `data-testid='name-filter'` para que a avaliação automatizada funcione.
  - Você deve usar **Context API e Hooks** para fazer o gerenciamento do estado da aplicação. Isso facilitará o desenvolvimento dos próximos requisitos.
</details>

---

## 3 – Crie um filtro para valores numéricos

<details><summary> O filtro funcionará com três seletores:</summary>

  - O primeiro deve abrir um dropdown que permita a quem usa selecionar uma das seguintes colunas: `population`, `orbital_period`, `diameter`, `rotation_period` e `surface_water`. Deve ser uma tag `select` com a propriedade `data-testid='column-filter'`.
  - O segundo deve determinar se a faixa de valor será `maior que`, `menor que` ou `igual a` o numero que virá a seguir. Deve ser uma tag `select` com a propriedade `data-testid='comparison-filter'`.
  - O terceiro deve ser uma caixa de texto que só aceita números. Essa caixa deve ser uma tag `input` com a propriedade `data-testid='value-filter'`.
  - Deve haver um botão para acionar o filtro, com a propriedade `data-testid='button-filter'`.
</details>

<details><summary> A combinação desses três seletores, após a pessoa usuária clicar no botão, deve filtrar os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos. Por exemplo:</summary>

  - A seleção `population | maior que | 100000` seleciona somente planetas com mais de 100000 habitantes.
  - A seleção `diameter | menor que | 8000` seleciona somente planetas com diâmetro menor que 8000.
</details>

<details><summary>Observações técnicas</summary>

  - Você deve usar **Context API e Hooks** para fazer o gerenciamento do estado da aplicação. Isso facilitará o desenvolvimento dos próximos requisitos.

</details>

---

## 4 – Implemente múltiplos filtros numéricos

<details><summary> Deverá ser possível adicionar múltiplos filtros numéricos. Todos os filtros adicionados devem funcionar de forma conjunta:</summary>

Por exemplo, você pode filtrar pelos planetas que tenham _Orbital period maior que 400_  **e** _Diameter menor que 10000_.

---

## 5 – Desenvolva testes para atingir 30% de cobertura total da aplicação

>:eyes: Observação: neste requisito, cubra a aplicação com testes unitários utilizando a biblioteca [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Aproveite essa oportunidade para colocar em prática o [Desenvolvimento Orientado por Testes](https://blog.betrybe.com/tecnologia/tdd-test-driven-development/).

<details><summary>Observações técnicas</summary>

  * Os testes criados por você não influenciarão os outros requisitos no avaliador. Você deverá desenvolver seus testes unitários e de integração usando a biblioteca React Testing Library, enquanto o avaliador usará a biblioteca [Cypress](https://docs.cypress.io/) para avaliar os requisitos, inclusive os de cobertura.
</details><br />

---

## 6 – Não utilize filtros repetidos

<details><summary> Caso um filtro seja totalmente preenchido, um novo filtro de valores numéricos deve ser carregado.</summary>

  * Esse novo filtro não deve incluir quaisquer colunas que já tenham sido selecionadas em filtros de valores numéricos anteriores.
  * Caso todas as colunas já tenham sido inclusas em filtros anteriores, não deve ser carregado um novo filtro.
  * Você deve usar **Context API e Hooks** para fazer o gerenciamento do estado da aplicação.
</details>

<details><summary> Exemplo:</summary>

  - O primeiro filtro tem as seguintes seleções: `population | maior que | 100000`.
  - Um segundo filtro deve aparecer após essas seleções serem todas feitas.
  - No primeiro dropdown deste segundo filtro, a opção `population` deve estar ausente.
  - <details><summary> Se, no segundo filtro, fosse selecionado `diameter | menor que | 8000`, o estado ficaria assim:</summary>

    ```javascript
    {
      filterByNumericValues: [
        {
          column: 'population',
          comparison: 'maior que',
          value: '100000',
        },
        {
          column: 'diameter',
          comparison: 'menor que',
          value: '8000',
        }
      ]
    }
    ```
  </details>


---

## 7 – Apague um filtro de valor numérico ao clicar no ícone `X` de um dos filtros e apague todas as filtragens numéricas simultaneamente ao clicar em outro botão `Remover todas filtragens`.

* <details><summary> O <code>button</code> que permite exclusão de um filtro deve existir em todos os filtros de valores numéricos:</summary>

  - Cada linha que demonstra o filtro já utilizado deve ter a propriedade `data-testid='filter'`, com um `button` que deve ser filho direto da tag onde foi utilizado o `data-testid='filter'`.
  - Após a exclusão, a coluna que esse filtro selecionava deve passar a ficar disponível nos dropdowns dos demais filtros já presentes na tela.
  - Você deve usar **Context API e Hooks** para fazer o gerenciamento do estado da aplicação.
  - <details><summary> Exemplo:</summary>

    ```html
    data-testid='filter'
        ⬑ column
        ⬑ comparison
        ⬑ value
        ⬑ button
    ```
  </details>
</details>


* O button `Remover todas filtragens` deverá possuir o `data-testid='button-remove-filters'`. Esse button será responsável pela remoção de todos os filtros numéricos simultaneamente.

---

## 8 – Desenvolva testes para atingir 60% de cobertura total da aplicação

<details><summary>Observações técnicas</summary>

  * Os testes criados por você não influenciarão os outros requisitos no avaliador. Você deverá desenvolver seus testes unitários e de integração usando a biblioteca React Testing Library, enquanto o avaliador usará a biblioteca [Cypress](https://docs.cypress.io/) para avaliar os requisitos, inclusive os de cobertura.
</details><br />

---

## 9 – Ordene as colunas de forma ascendente ou descendente

* A ordenação deve ser feita via filtro: um dropdown selecionará a coluna a basear a ordenação e um par de radio buttons determinará se a coluna é ascendente ou descendente.

* <details><summary> A informação acerca da ordenação das colunas deve ser armazenada em um novo campo <code>{ order: { column: 'population', sort: 'ASC'} }</code>:</summary>

  - O campo `column` representa o nome da coluna a ordenar.
  - O campo `sort` representa a ordenação, em que 'ASC' ascendente e 'DESC' descendente.
</details>

* <details><summary> O dropdown deve ser um elemento <code>select</code>:</summary>

  - O `dropdown` precisa ter a propriedade `data-testid='column-sort'`.
  - <details><summary> As colunas selecionáveis por meio desse <code>dropdown</code> são:</summary>

    - 'population';
    - 'orbital_period';
    - 'diameter';
    - 'rotation_period';
    - 'surface_water'.
    </details>
</details>

* <details><summary> É necessário ter dois <code>inputs</code> de tipo <code>radio</code>:</summary>

  - O primeiro deve ter o atributo `data-testid='column-sort-input-asc'` e `value` sendo `ASC`,
  - O segundo deve ter o atributo `data-testid='column-sort-input-desc'` e `value` sendo `DESC`.
</details>

* :eyes: Caso a coluna ordenada tenha planetas com valores `unknown`, você deverá ordenar os planetas de forma que os valores `unknown` fiquem em último lugar na ordenação.

* Por fim, crie um botão para submeter a ordenação, com uma tag `button` e a propriedade `data-testid='column-sort-button'`.

* Adicione o atributo `data-testid` com o valor `planet-name` em todos os elementos da tabela que tenham o nome de um planeta.

---

# Requisito Bônus

## 10 – Desenvolva testes para atingir 90% de cobertura total da aplicação

<details><summary>Observações técnicas</summary>

  * Os testes criados por você não influenciarão os outros requisitos no avaliador. Você deverá desenvolver seus testes unitários e de integração usando a biblioteca React Testing Library, enquanto o avaliador usará a biblioteca [Cypress](https://docs.cypress.io/) para avaliar os requisitos, inclusive os de cobertura.
</details><br />
