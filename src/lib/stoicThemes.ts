export type SupportedLocale = 'pt-BR' | 'en-US' | 'es-ES';

export type StoicTheme = {
  title: string;
  quote: Record<SupportedLocale, string>;
  description: Record<SupportedLocale, string>;
};

const themes: StoicTheme[] = [
  {
    title: 'Memento Mori',
    quote: {
      'pt-BR': 'Você ainda tem tempo para se tornar melhor.',
      'en-US': 'You still have time to become better.',
      'es-ES': 'Todavía tienes tiempo para mejorar.',
    },
    description: {
      'pt-BR': 'A consciência da mortalidade nos torna mais sábios e gratos pela vida.',
      'en-US': 'Awareness of mortality makes us wiser and more grateful for life.',
      'es-ES': 'La conciencia de la mortalidad nos hace más sabios y agradecidos por la vida.',
    },
  },
  {
    title: 'Ataraxia',
    quote: {
      'pt-BR': 'A imperturbabilidade nasce do desapego ao que não está sob seu controle.',
      'en-US': 'Imperturbability is born from detachment to what you cannot control.',
      'es-ES': 'La imperturbabilidad nace del desapego a lo que no puedes controlar.',
    },
    description: {
      'pt-BR': 'A paz mental vem quando soltamos o que não depende de nós.',
      'en-US': 'Peace of mind comes when we release what does not depend on us.',
      'es-ES': 'La paz mental llega cuando soltamos lo que no depende de nosotros.',
    },
  },
  {
    title: 'Amor Fati',
    quote: {
      'pt-BR': 'Não peça que as coisas aconteçam como você quer, mas deseje que aconteçam como acontecem.',
      'en-US': 'Do not wish that things happen as you want, but want them to happen as they do.',
      'es-ES': 'No desees que las cosas ocurran como quieres, sino quiérelas como ocurren.',
    },
    description: {
      'pt-BR': 'Transforme desafios em combustível para seu crescimento.',
      'en-US': 'Turn challenges into fuel for your growth.',
      'es-ES': 'Convierte los desafíos en combustible para tu crecimiento.',
    },
  },
  {
    title: 'Dicotomia do Controle',
    quote: {
      'pt-BR': 'Há coisas que estão sob nosso controle e coisas que não estão.',
      'en-US': 'There are things within our control and things outside it.',
      'es-ES': 'Hay cosas bajo nuestro control y cosas fuera de él.',
    },
    description: {
      'pt-BR': 'Concentre sua energia apenas no que depende de você.',
      'en-US': 'Focus your energy only on what depends on you.',
      'es-ES': 'Enfoca tu energía solo en lo que depende de ti.',
    },
  },
  {
    title: 'Apateia',
    quote: {
      'pt-BR': 'A verdadeira liberdade vem quando você não quer ser escravo de suas paixões.',
      'en-US': 'True freedom comes when you do not wish to be slave to your passions.',
      'es-ES': 'La verdadera libertad viene cuando no deseas ser esclavo de tus pasiones.',
    },
    description: {
      'pt-BR': 'Mantenha o equilíbrio emocional diante dos desejos perturbadores.',
      'en-US': 'Maintain emotional balance in the face of disturbing desires.',
      'es-ES': 'Mantén el equilibrio emocional frente a deseos perturbadores.',
    },
  },
  {
    title: 'Cosmopolitismo',
    quote: {
      'pt-BR': 'Você é um cidadão do universo antes de ser de qualquer país.',
      'en-US': 'You are a citizen of the universe before you are of any country.',
      'es-ES': 'Eres un ciudadano del universo antes que de cualquier país.',
    },
    description: {
      'pt-BR': 'A grandeza está em servir algo maior do que você.',
      'en-US': 'Greatness lies in serving something greater than yourself.',
      'es-ES': 'La grandeza está en servir algo más grande que tú.',
    },
  },
  {
    title: 'Prosoche',
    quote: {
      'pt-BR': 'Onde a mente vai, o corpo segue.',
      'en-US': 'Where the mind goes, the body follows.',
      'es-ES': 'Donde va la mente, sigue el cuerpo.',
    },
    description: {
      'pt-BR': 'Permaneça totalmente presente em cada pensamento e ação.',
      'en-US': 'Stay fully present in every thought and action.',
      'es-ES': 'Permanece totalmente presente en cada pensamiento y acción.',
    },
  },
  {
    title: 'Preferências Naturais',
    quote: {
      'pt-BR': 'A virtude é o único bem; as preferências são secundárias.',
      'en-US': 'Virtue is the only good; preferences are secondary.',
      'es-ES': 'La virtud es el único bien; las preferencias son secundarias.',
    },
    description: {
      'pt-BR': 'Viva de acordo com seus valores sem ser governado por desejos.',
      'en-US': 'Live by your values without being ruled by desires.',
      'es-ES': 'Vive según tus valores sin ser gobernado por deseos.',
    },
  },
  {
    title: 'Premeditatio Malorum',
    quote: {
      'pt-BR': 'Prepare a mente para a dificuldade antes que ela chegue.',
      'en-US': 'Prepare the mind for difficulty before it arrives.',
      'es-ES': 'Prepara la mente para la dificultad antes de que llegue.',
    },
    description: {
      'pt-BR': 'A antecipação reduz o choque e aumenta sua força.',
      'en-US': 'Anticipation reduces shock and increases your strength.',
      'es-ES': 'La anticipación reduce el impacto y aumenta tu fuerza.',
    },
  },
  {
    title: 'Sympatheia',
    quote: {
      'pt-BR': 'Tudo no universo está conectado.',
      'en-US': 'Everything in the universe is connected.',
      'es-ES': 'Todo en el universo está conectado.',
    },
    description: {
      'pt-BR': 'Suas ações reverberam além do seu próprio universo.',
      'en-US': 'Your actions reverberate beyond your own universe.',
      'es-ES': 'Tus acciones reverberan más allá de tu propio universo.',
    },
  },
  {
    title: 'Enkrateia',
    quote: {
      'pt-BR': 'O grande passo é aprender a governar a si mesmo.',
      'en-US': 'The great step is learning to govern yourself.',
      'es-ES': 'El gran paso es aprender a gobernarte a ti mismo.',
    },
    description: {
      'pt-BR': 'Disciplina e razão são o caminho para a liberdade interna.',
      'en-US': 'Discipline and reason are the path to inner freedom.',
      'es-ES': 'La disciplina y la razón son el camino a la libertad interior.',
    },
  },
  {
    title: 'Eudaimonia',
    quote: {
      'pt-BR': 'A felicidade vem de viver de acordo com a razão e a virtude.',
      'en-US': 'Happiness comes from living according to reason and virtue.',
      'es-ES': 'La felicidad viene de vivir según la razón y la virtud.',
    },
    description: {
      'pt-BR': 'Culmine o ano com paz interior e propósito virtuoso.',
      'en-US': 'End the year with inner peace and virtuous purpose.',
      'es-ES': 'Termina el año con paz interior y propósito virtuoso.',
    },
  },
];

export function getPreferredLocale(language?: string): SupportedLocale {
  if (!language) {
    return 'pt-BR';
  }

  const normalized = language.toLowerCase();
  if (normalized.startsWith('en')) {
    return 'en-US';
  }
  if (normalized.startsWith('es')) {
    return 'es-ES';
  }
  return 'pt-BR';
}

export function getMonthlyTheme(date = new Date(), language?: string) {
  const locale = getPreferredLocale(language);
  const monthIndex = date.getMonth();
  const theme = themes[monthIndex] || themes[0];

  return {
    title: theme.title,
    quote: theme.quote[locale],
    description: theme.description[locale],
  };
}
