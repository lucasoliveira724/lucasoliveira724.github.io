import clickHome from '../assets/projects/click-imoveis/site/home.png'
import clickListagem from '../assets/projects/click-imoveis/site/listagem-imoveis.png'
import clickDetalhe from '../assets/projects/click-imoveis/site/detalhe-imovel.png'
import clickAdmin from '../assets/projects/click-imoveis/site/painel-admin.png'
import clickAppHome from '../assets/projects/click-imoveis/app/home.jpeg'
import sandroCapa from '../assets/projects/sandro-car/capa-sandro.png'
import sandroServicos from '../assets/projects/sandro-car/servicos-sandro.png'
import sandroMarcas from '../assets/projects/sandro-car/marcas-sandro.png'
import sandroContato from '../assets/projects/sandro-car/contato-footer-sandro.png'
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
export type Project = { visible: boolean; name: string; category: string; description: string; technologies: string[]; github: string; githubLabel?: string; slides: ProjectSlide[] }

export const projects: Project[] = [
  {
    visible: true, name: 'Click Imóveis', category: 'Plataforma Web & Mobile',
    description:'Ecossistema digital para o mercado imobiliário, composto por plataforma web, painel administrativo e aplicativo mobile. A solução centraliza a apresentação e o gerenciamento de imóveis, oferecendo busca e visualização de propriedades, favoritos e canais de contato em uma experiência integrada entre web e mobile.',    technologies: ['Next.js', 'React Native', 'Firebase', 'Expo'], github: 'https://github.com/lucasoliveira724/click-imoveis-showcase',
    slides: [
      { label: 'Home', subtitle: 'Plataforma Web', tone: 'blue', image: clickHome },
      { label: 'Imóveis', subtitle: 'Listagem de imóveis', tone: 'sky', image: clickListagem },
      { label: 'Detalhes', subtitle: 'Detalhes do imóvel', tone: 'slate', image: clickDetalhe },
      { label: 'Admin', subtitle: 'Painel Administrativo', tone: 'aqua', image: clickAdmin },
      { label: 'Mobile', subtitle: 'Aplicativo Mobile', tone: 'blue', image: clickAppHome },
    ],
  },
  {
    visible: true, name: 'Sandro Car', category: 'Web Development',
    description: 'Site institucional desenvolvido para uma empresa do segmento automotivo, com foco na apresentação de serviços, marcas atendidas e canais de contato por meio de uma interface moderna, clara e organizada.',
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'], github: 'https://github.com/lucasoliveira724/sandro-car-showcase', githubLabel: 'Ver Case no GitHub',
    slides: [
      { label: 'Capa', subtitle: 'Apresentação do site', tone: 'blue', image: sandroCapa },
      { label: 'Serviços', subtitle: 'Serviços automotivos', tone: 'sky', image: sandroServicos },
      { label: 'Marcas', subtitle: 'Marcas atendidas', tone: 'slate', image: sandroMarcas },
      { label: 'Contato', subtitle: 'Contato e localização', tone: 'aqua', image: sandroContato },
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





