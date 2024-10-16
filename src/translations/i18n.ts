import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const appName = 'SmartBuy';

const resources = {
  EN: {
    translation: {
      welcome: 'Welcome',
      appName: appName,
      shared: {
        profile: 'Profile',
        logout: 'Logout',
        subscription: 'Subscription Type',
        advanced: 'Advanced',
        premium: 'Premium',
        success: 'Subscription updated successfully',
        failure: 'Failed to update subscription',
        years: 'years',
      },
      afford: 'Can I afford it?',
      fees: 'Any hidden fees?',
      header: {
        costsCalculator: 'Costs Calculator',
        affordabilityCheck: 'Affordability check',
        taxesAndFees: 'Taxes and fees explained',
        pricing: 'Pricing',
        faq: 'FAQs',
      },
      calculator: {
        title: 'Budget Calculator',
        upfront: 'How much upfront?',
        propertyDetails: 'Property Details',
        propertyPrice: 'Property Price',
        downPayment: 'Down Payment',
        mortgageTerm: 'Mortgage Term',
        interestRate: 'Interest Rate',
        location: 'Location',
        costBreakdown: 'Cost Breakdown',
        totalUpfrontCosts: 'Total Upfront Costs',
        monthlyMortgagePayment: 'Monthly Mortgage Payment',
        closingCosts: 'Closing Costs',
        decreaseBy10k: 'Decrease by 10,000',
        decreaseBy1k: 'Decrease by 1,000',
        increaseBy1k: 'Increase by 1,000',
        increaseBy10k: 'Increase by 10,000',
      },
      faq: {
        title: 'Frequently Asked Questions',
        whatIsSmartBuy: 'What is SmartBuy and how does it help me when buying a house in Portugal?',
        whatIsSmartBuyAnswer: 'SmartBuy is a tool that calculates all the costs involved in buying a house in Portugal. It helps you visualize and compare different investment scenarios, enabling you to make informed decisions and avoid financial surprises.',
        howCalculateCosts: 'How does SmartBuy calculate the total costs of purchasing a property?',
        howCalculateCostsAnswer: 'SmartBuy takes into account all associated costs, including taxes, fees, commissions, and other expenses related to the purchase process, giving you a clear and accurate view of the total amount needed to buy a house.',
        compareScenarios: 'Can I compare different purchase scenarios with SmartBuy?',
        compareScenariosAnswer: 'Yes! SmartBuy allows you to compare various calculations for different properties or situations, helping you understand which option best fits your budget and goals.',
        affordHouse: 'Does SmartBuy help me know if I can afford a house?',
        affordHouseAnswer: 'Yes, with the "Can I afford it?" feature, SmartBuy analyzes your financial situation and the house’s costs to determine if it’s within your means, helping you make realistic and safe decisions.',
        suitableFor: 'Is SmartBuy suitable for first-time homebuyers or real estate investors?',
        suitableForAnswer: 'SmartBuy is useful for both first-time buyers and investors. For inexperienced buyers, it simplifies understanding the costs, while for real estate investors, it provides a clear view of investments and potential profits.',
      },
      footer: {
        appName: 'SmartBuy',
        description: 'SmartBuy simplifies your home-buying journey in Portugal by breaking down every hidden cost, so you can confidently budget and avoid surprises. Make smarter decisions and compare options easily, ensuring your investment is sound and stress-free.',
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
    },
  },
  PT: {
    translation: {
      welcome: 'Bem-vindo',
      appName: appName,
      shared: {
        profile: 'Perfil',
        logout: 'Sair',
        subscription: 'Tipo de Assinatura',
        advanced: 'Avançado',
        premium: 'Premium',
        success: 'Assinatura atualizada com sucesso',
        failure: 'Falha ao atualizar assinatura',
        years: 'anos',
      },
      afford: 'Posso pagar?',
      fees: 'Alguma taxa oculta?',
      header: {
        costsCalculator: 'Calculadora de Custos',
        affordabilityCheck: 'Verificação de Acessibilidade',
        taxesAndFees: 'Impostos e taxas explicados',
        pricing: 'Preços',
        faq: 'FAQs',
      },
      calculator: {
        title: 'Calculadora de Orçamento',
        upfront: 'Quanto de entrada?',
        propertyDetails: 'Detalhes do Imóvel',
        propertyPrice: 'Preço do Imóvel',
        downPayment: 'Entrada',
        mortgageTerm: 'Prazo do Empréstimo',
        interestRate: 'Taxa de Juros',
        location: 'Localização',
        costBreakdown: 'Detalhamento de Custos',
        totalUpfrontCosts: 'Custos Totais Iniciais',
        monthlyMortgagePayment: 'Pagamento Mensal da Hipoteca',
        closingCosts: 'Custos de Fechamento',
        decreaseBy10k: 'Diminuir em 10.000',
        decreaseBy1k: 'Diminuir em 1.000',
        increaseBy1k: 'Aumentar em 1.000',
        increaseBy10k: 'Aumentar em 10.000',
      },
      faq: {
        title: 'Perguntas Frequentes',
        whatIsSmartBuy: 'O que é o SmartBuy e como ele me ajuda na compra de uma casa em Portugal?',
        whatIsSmartBuyAnswer: 'O SmartBuy é uma ferramenta que permite calcular todos os custos associados à compra de uma casa em Portugal. Ele ajuda-o a visualizar e comparar diferentes cenários de investimento, permitindo tomar decisões informadas e evitar surpresas financeiras.',
        howCalculateCosts: 'Como o SmartBuy calcula os custos totais de uma compra de imóvel?',
        howCalculateCostsAnswer: 'O SmartBuy considera todos os custos envolvidos, incluindo impostos, taxas, comissões e outras despesas associadas ao processo de compra, dando-lhe uma visão clara e precisa do valor total necessário para adquirir a casa.',
        compareScenarios: 'Posso comparar diferentes cenários de compra com o SmartBuy?',
        compareScenariosAnswer: 'Sim! O SmartBuy permite-lhe comparar vários cálculos de diferentes imóveis ou situações, ajudando-o a perceber qual a melhor opção para o seu orçamento e objetivos.',
        affordHouse: 'O SmartBuy ajuda-me a saber se posso pagar uma casa?',
        affordHouseAnswer: 'Sim, com a funcionalidade "Can I afford it?", o SmartBuy analisa a sua situação financeira e os custos da casa para verificar se está dentro das suas possibilidades, ajudando-o a tomar decisões realistas e seguras.',
        suitableFor: 'O SmartBuy é adequado para quem está a comprar a primeira casa ou para investidores imobiliários?',
        suitableForAnswer: 'O SmartBuy é útil tanto para quem compra a primeira casa como para investidores. Para compradores inexperientes, simplifica o processo de entender os custos, enquanto para investidores imobiliários oferece uma visão clara dos investimentos e dos potenciais lucros.',
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
