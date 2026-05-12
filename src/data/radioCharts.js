import brunoMars from '../assets/images/do-you-think-bruno-mars-i-just-might-can-debut-at-on-the-v0-xc35q46tylcg1.jpeg 1.png'
import heartCover from '../assets/images/ab67616d0000b2736ac3c7938191585c53c8180d 1.png'
import monochromeCover from '../assets/images/artworks-6DdY5PEGoslQdBYW-hYkfkg-t500x500.png 1.png'
import bandCover from '../assets/images/668466117_1415711460573623_7254924411462988607_n 1.png'

const baseCards = [
  {
    id: 'armin',
    artist: 'Armin Van Buuren',
    title: 'Turn Magic',
    image: brunoMars,
    imagePosition: 'center center',
    trend: 'up',
  },
  {
    id: 'audien',
    artist: 'Audien',
    title: 'Wish It Was You',
    image: heartCover,
    imagePosition: 'center center',
    trend: 'hot',
  },
  {
    id: 'miley',
    artist: 'Miley Cyrus',
    title: 'Prisoner',
    image: monochromeCover,
    imagePosition: 'center center',
    trend: 'up',
  },
  {
    id: 'swns',
    artist: 'SWNS',
    title: 'Never',
    image: bandCover,
    imagePosition: 'center center',
    trend: 'hot',
  },
]

export const radioChartRows = [
  {
    id: 'szunet',
    label: 'SZUNET CHART',
    tone: 'szunet',
    cards: baseCards,
  },
  {
    id: 'oldschool',
    label: 'OLDSCHOOL CHART',
    tone: 'oldschool',
    cards: baseCards,
  },
  {
    id: 'power',
    label: 'POWER CHART',
    tone: 'power',
    cards: baseCards,
  },
  {
    id: 'relax',
    label: 'RELAX CHART',
    tone: 'relax',
    cards: baseCards,
  },
  {
    id: 'electric',
    label: 'ELECTRIC CHART',
    tone: 'electric',
    cards: baseCards,
  },
]
