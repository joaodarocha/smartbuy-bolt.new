import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const appName = 'Can I Afford';

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
