import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  EN: {
    translation: {
      appName: 'SmartBuy',
      header: {
        costsCalculator: 'Costs Calculator',
        affordabilityCheck: 'Affordability Check',
        taxesAndFees: 'Taxes and Fees',
        pricing: 'Pricing',
        faq: 'FAQ',
      },
      calculator: {
        costBreakdown: "Cost Breakdown",
        downPayment: "Down Payment",
        downPaymentCurrency: "Down Payment (€)",
        downPaymentPercentage: "Down Payment (%)",
        euriborRates: {
          title: "Euribor Rates"
        },
        hideDetails: "Hide Details",
        imt: "IMT",
        interestRate: "Interest Rate",
        location: "Location",
        monthlyMortgagePayment: "Monthly Mortgage Payment",
        mortgageTerm: "Mortgage Term",
        notaryFees: "Notary Fees",
        propertyDetails: "Property Details",
        propertyPrice: "Property Price",
        registrationFees: "Registration Fees",
        showDetails: "Show Details",
        stampDuty: "Stamp Duty",
        taxesAndFees: "Taxes and Fees",
        title: "Costs Calculator",
        totalUpfrontCosts: "Total Upfront Costs",
        years: 'years',
      },
      canIAfford: {
        title: 'Can I afford it?',
        grossIncome: 'Gross Income',
        monthly: 'Monthly',
        yearly: 'Yearly',
        incomeType: 'Income Type',
        monthlyDebts: 'Monthly Debts',
        monthlyExpenses: 'Monthly Expenses',
        propertyPrice: 'Property Price',
        downPayment: 'Down Payment (%)',
        interestRate: 'Interest Rate (%)',
        mortgageTerm: 'Mortgage Term (years)',
        affordabilityResult: 'Affordability Result',
        affordable: 'You can comfortably afford a mortgage of up to €{{price}}.',
        notAffordable: 'Based on your financial situation, a mortgage may stretch your budget.',
      },
      location: 'Location',
      costBreakdown: 'Cost Breakdown',
      totalUpfrontCosts: 'Total Upfront Costs',
      monthlyMortgagePayment: 'Monthly Mortgage Payment',
      closingCosts: 'Closing Costs',
      years: 'years',
      euriborRates: 'Euribor Rates',
      euribor_3_months: '3 Months',
      euribor_6_months: '6 Months',
      euribor_12_months: '12 Months',
      faq: {
        title: 'Frequently Asked Questions',
        whatIsSmartBuy: 'What is SmartBuy and how does it help me buy a house in Portugal?',
        whatIsSmartBuyAnswer: 'SmartBuy is a tool that allows you to calculate all the costs associated with buying a house in Portugal. It helps you visualize and compare different investment scenarios, enabling you to make informed decisions and avoid financial surprises.',
        howCalculateCosts: 'How does SmartBuy calculate the total costs of a property purchase?',
        howCalculateCostsAnswer: 'SmartBuy considers all the costs involved, including taxes, fees, commissions, and other expenses associated with the purchase process, giving you a clear and accurate view of the total amount needed to acquire the house.',
        compareScenarios: 'Can I compare different purchase scenarios with SmartBuy?',
        compareScenariosAnswer: 'Yes! SmartBuy allows you to compare various calculations of different properties or situations, helping you understand which option is best for your budget and goals.',
        affordHouse: 'Does SmartBuy help me know if I can afford a house?',
        affordHouseAnswer: 'Yes, with the "Can I afford it?" feature, SmartBuy analyzes your financial situation and the house costs to check if it is within your means, helping you make realistic and safe decisions.',
        suitableFor: 'Is SmartBuy suitable for first-time homebuyers or real estate investors?',
        suitableForAnswer: 'SmartBuy is useful for both first-time homebuyers and investors. For inexperienced buyers, it simplifies the process of understanding costs, while for real estate investors, it offers a clear view of investments and potential profits.',
      },
      foldableSection: {
        show: "Show",
        hide: "Hide",
        details: "Details"
      },
      footer: {
        appName: 'SmartBuy',
        description: 'With SmartBuy, the entire home buying process in Portugal becomes simpler and without surprises. Control costs, compare scenarios, and buy with confidence, without the fear of making financial mistakes.',
        quickLinks: 'Quick Links',
        home: 'Home',
        features: 'Features',
        pricing: 'Pricing',
        faq: 'FAQ',
        contactUs: 'Contact Us',
        email: 'Email: support@smartbuy.pt',
        phone: 'Phone: +351 999 123 456',
        rightsReserved: 'All rights reserved.',
      },
      rate: 'rate'
    },
  },
  PT: {
    translation: {
      appName: 'SmartBuy',
      calculator: {
        costBreakdown: "Detalhamento de Custos",
        downPayment: "Entrada",
        downPaymentCurrency: "Entrada (€)",
        downPaymentPercentage: "Entrada (%)",
        euriborRates: {
          title: "Taxas Euribor"
        },
        hideDetails: "Ocultar Detalhes",
        imt: "IMT",
        interestRate: "Taxa de Juros",
        location: "Localização",
        monthlyMortgagePayment: "Mensalidade de Crédito Habitação",
        mortgageTerm: "Prazo da Hipoteca",
        notaryFees: "Taxas de Notário",
        propertyDetails: "Compra",
        propertyPrice: "Preço da Propriedade",
        registrationFees: "Taxas de Registro",
        showDetails: "Mostrar Detalhes",
        stampDuty: "Imposto de Selo",
        taxesAndFees: "Impostos e Taxas",
        title: "Calculadora de Custos",
        totalUpfrontCosts: "Custos Iniciais Totais",
        years: 'anos',
      },
      canIAfford: {
        affordabilityResult: 'Resultado da Acessibilidade',
        affordable: 'Você pode confortavelmente pagar uma hipoteca de até €{{price}}.',
        downPayment: 'Entrada (%)',
        grossIncome: 'Rendimento Bruto',
        incomeType: 'Tipo de Rendimento',
        interestRate: 'Taxa de Juros (%)',
        monthly: 'Mensal',
        monthlyDebts: 'Dívidas Mensais',
        monthlyExpenses: 'Despesas Mensais',
        mortgageTerm: 'Prazo da Hipoteca (anos)',
        notAffordable: 'Com base na sua situação financeira, uma hipoteca pode esticar seu orçamento.',
        propertyPrice: 'Preço da Propriedade',
        title: 'Posso pagar?',
        yearly: 'Anual',
      },
      closingCosts: 'Custos de Fechamento',
      costBreakdown: 'Cáculo de Custos',
      euriborRates: 'Taxas Euribor',
      euribor_12_months: '12 Meses',
      euribor_3_months: '3 Meses',
      euribor_6_months: '6 Meses',
      faq: {
        title: 'Perguntas Frequentes',
        whatIsSmartBuy: 'O que é o SmartBuy e como ele me ajuda na compra de uma casa em Portugal?',
        whatIsSmartBuyAnswer: 'O SmartBuy é uma ferramenta que permite calcular todos os custos associados à compra de uma casa em Portugal. Ele ajuda-o a visualizar e comparar diferentes cenários de investimento, permitindo tomar decisões informadas e evitar surpresas financeiras.',
        howCalculateCosts: 'Como o SmartBuy calcula os custos totais de uma compra de imóvel?',
        howCalculateCostsAnswer: 'O SmartBuy considera todos os custos envolvidos, incluindo impostos, taxas, comissões e outras despesas associadas ao processo de compra, dando-lhe uma visão clara e precisa do valor total necessário para adquirir a casa.',
        compareScenarios: 'Posso comparar diferentes cenários de compra com o SmartBuy?',
        compareScenariosAnswer: 'Sim! O SmartBuy permite-lhe comparar vários cálculos de diferentes imóveis ou situações, ajudando-o a perceber qual a melhor opção para o seu orçamento e objetivos.',
        affordHouse: 'O SmartBuy ajuda-me a saber se posso pagar uma casa?',
        affordHouseAnswer: 'Sim, com a funcionalidade "Posso pagar?", o SmartBuy analisa a sua situação financeira e os custos da casa para verificar se está dentro das suas possibilidades, ajudando-o a tomar decisões realistas e seguras.',
        suitableFor: 'O SmartBuy é adequado para quem está a comprar a primeira casa ou para investidores imobiliários?',
        suitableForAnswer: 'O SmartBuy é útil tanto para quem compra a primeira casa como para investidores. Para compradores inexperientes, simplifica o processo de entender os custos, enquanto para investidores imobiliários oferece uma visão clara dos investimentos e dos potenciais lucros.',
      },
      foldableSection: {
        show: "Mostrar",
        hide: "Ocultar",
        details: "Detalhes"
      },
      footer: {
        appName: 'SmartBuy',
        description: 'Com o SmartBuy, todo o processo de compra de casa em Portugal torna-se mais simples e sem surpresas. Controle os custos, compare cenários e compre com confiança, sem o medo de cometer erros financeiros.',
        quickLinks: 'Links Rápidos',
        home: 'Início',
        features: 'Recursos',
        pricing: 'Preços',
        faq: 'FAQ',
        contactUs: 'Contate-Nos',
        email: 'Email: support@smartbuy.pt',
        phone: 'Telefone: +351 999 123 456',
        rightsReserved: 'Todos os direitos reservados.',
      },
      header: {
        costsCalculator: 'Calculadora de Custos',
        affordabilityCheck: 'Verificação de Acessibilidade',
        taxesAndFees: 'Impostos e Taxas',
        pricing: 'Preços',
        faq: 'FAQ',
      },
      location: 'Localização',
      monthlyMortgagePayment: 'Pagamento Mensal da Hipoteca',
      totalUpfrontCosts: 'Custos Totais Iniciais',
      years: 'anos',
      rate: "taxa"
    },
  },
};

i18n
.use(initReactI18next)
.init({
  resources,
  lng: 'EN', // default language
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
