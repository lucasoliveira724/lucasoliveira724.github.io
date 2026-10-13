import clickSiteShowcase from '../assets/projects/click-imoveis/showcase/site-showcase.webp'
import clickAdminShowcase from '../assets/projects/click-imoveis/showcase/admin-showcase.webp'
import clickAppShowcase from '../assets/projects/click-imoveis/showcase/app-showcase.webp'
import sandroHomeShowcase from '../assets/projects/sandro-car/showcase/home-showcase.webp'
import sandroServicosShowcase from '../assets/projects/sandro-car/showcase/servicos-showcase.webp'
import sandroContatoShowcase from '../assets/projects/sandro-car/showcase/contato-showcase.webp'
import gPrimeCardapio from '../assets/projects/g-prime-grill/showcase/cardapio-showcase.webp'
import gPrimePainel from '../assets/projects/g-prime-grill/showcase/painel-showcase.webp'
import gPrimeWhatsapp from '../assets/projects/g-prime-grill/showcase/whatsapp-showcase.webp'
import fertilHome from '../assets/projects/fertil-agricola/site/home.png'
import fertilProdutos from '../assets/projects/fertil-agricola/site/produtos.png'
import fertilDetalhes from '../assets/projects/fertil-agricola/site/detalhes.png'
import fertilSobre from '../assets/projects/fertil-agricola/site/sobre.png'
import fertilHomeMobile from '../assets/projects/fertil-agricola/site/home-mobi.jpeg'

export const links = {
  github: 'https://github.com/lucasoliveira724',
  linkedin: 'https://www.linkedin.com/in/lucas-oliveira-7948b494/',
  email: 'mailto:lucasjoseoliveira724@gmail.com',
  whatsapp: `https://wa.me/5511999046597?text=${encodeURIComponent('Olá, Lucas! Encontrei seu portfólio e gostaria de conversar sobre um projeto ou oportunidade.')}`,
  salesforceCases: 'https://github.com/lucasoliveira724/salesforce-marketing-cloud-cases',
}

export type ProjectSlide = { label: string; subtitle: string; tone: string; image?: string }
export type Project = { visible: boolean; name: string; category: string; description: string; technologies: string[]; github?: string; githubLabel?: string; slides: ProjectSlide[] }

export const projects: Project[] = [
  {
    visible: true, name: 'Click Imóveis', category: 'Plataforma Web & Mobile',
    description:'Ecossistema digital para o mercado imobiliário, composto por plataforma web, painel administrativo e aplicativo mobile. A solução centraliza a apresentação e o gerenciamento de imóveis, oferecendo busca e visualização de propriedades, favoritos e canais de contato em uma experiência integrada entre web e mobile.',    technologies: ['Next.js', 'React Native', 'Firebase', 'Expo'], github: 'https://github.com/lucasoliveira724/click-imoveis-showcase',
    slides: [
      { label: 'Site', subtitle: 'Plataforma imobiliária', tone: 'blue', image: clickSiteShowcase },
      { label: 'Gestão', subtitle: 'Painel administrativo', tone: 'sky', image: clickAdminShowcase },
      { label: 'App', subtitle: 'Aplicativo Click Imóveis', tone: 'aqua', image: clickAppShowcase },
    ],
  },
  {
    visible: true, name: 'Sandro Car', category: 'Web Development',
    description: 'Site institucional desenvolvido para uma empresa do segmento automotivo, com foco na apresentação de serviços, marcas atendidas e canais de contato por meio de uma interface moderna, clara e organizada.',
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'], github: 'https://github.com/lucasoliveira724/sandro-car-showcase', githubLabel: 'Ver Case no GitHub',
    slides: [
      { label: 'Home', subtitle: 'Site institucional responsivo', tone: 'blue', image: sandroHomeShowcase },
      { label: 'Serviços', subtitle: 'Serviços e marcas atendidas', tone: 'sky', image: sandroServicosShowcase },
      { label: 'Contato', subtitle: 'Localização e canais de contato', tone: 'aqua', image: sandroContatoShowcase },
    ],
  },
  {
    visible: true, name: 'G Prime Grill', category: 'Cardápio digital',
    description: 'Cardápio digital responsivo com painel administrativo para organizar produtos, categorias, condomínios e eventos. O fluxo de pedidos reúne as informações do cliente e do carrinho para envio pelo WhatsApp.',
    technologies: ['React', 'TypeScript', 'Vite', 'Firebase'],
    slides: [
      { label: 'Cardápio', subtitle: 'Cardápio digital responsivo', tone: 'blue', image: gPrimeCardapio },
      { label: 'Painel', subtitle: 'Painel administrativo', tone: 'slate', image: gPrimePainel },
      { label: 'WhatsApp', subtitle: 'Pedido organizado pelo WhatsApp', tone: 'aqua', image: gPrimeWhatsapp },
    ],
  },
  {
    visible: false, name: 'Fértil Agrícola', category: 'Plataforma Web',
    description: 'Plataforma web institucional e comercial desenvolvida para fortalecer a presença digital da Fértil Agrícola. O projeto reúne apresentação da empresa, catálogo de produtos, marcas parceiras, aplicações e resultados no campo, além de canais de contato, em uma experiência moderna, responsiva e voltada ao agronegócio.',
    technologies: ['React', 'Vite', 'Tailwind CSS'], github: 'https://github.com/lucasoliveira724/fertil-agro-showcase',
    slides: [
      { label: 'Home', subtitle: 'Plataforma institucional', tone: 'green', image: fertilHome },
      { label: 'Produtos', subtitle: 'Produtos e soluções', tone: 'lime', image: fertilProdutos },
      { label: 'Detalhes', subtitle: 'Detalhes do produto', tone: 'field', image: fertilDetalhes },
      { label: 'Sobre', subtitle: 'Sobre a empresa', tone: 'sage', image: fertilSobre },
      { label: 'Mobile', subtitle: 'Experiência responsiva', tone: 'green', image: fertilHomeMobile },
    ],
  },
]

export const cases = [
  { title: 'Carrinho Abandonado', description: 'Automação, elegibilidade e controle de reentrada.', url: 'https://github.com/lucasoliveira724/salesforce-marketing-cloud-cases/tree/main/cases/abandoned-cart' },
  { title: 'Jornada de Boas-Vindas', description: 'Personalização e recomendação dinâmica de produtos.', url: 'https://github.com/lucasoliveira724/salesforce-marketing-cloud-cases/tree/main/cases/welcome-journey' },
  { title: 'Gestão de Consentimento', description: 'Opt-in e opt-out multicanal.', url: 'https://github.com/lucasoliveira724/salesforce-marketing-cloud-cases/tree/main/cases/consent-management' },
  { title: 'Marketing Reporting', description: 'Persistência e consolidação de métricas de marketing.', url: 'https://github.com/lucasoliveira724/salesforce-marketing-cloud-cases/tree/main/cases/marketing-reporting' },
]





