export const categorys = [
  'Animales',
  'Personajes',
  'Temáticos',
  'Películas y Series',
  'Deporte',
  'Ciencia ficción y fantasía',
  'Comida',
  'Otros',
] as const

/* images */

export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]


/* variant section  */
export const maxVariables = 4
export const minVariables = 1

export const sizesVariant = [
  {
    value: '1',
    size: 'Pequeño',
  },
  {
    value: '2',
    size: 'Mediano',
  },
  {
    value: '3',
    size: 'Grande',
  },
  {
    value: '4',
    size: 'Gigante',
  },
] as const

export const suggestions = [
  {
    title: 'Colors',
    paragraph:
      "Tags like 'Red,' 'Blue,' 'Pink' to indicate the colors of the plush toys.",
  },
  {
    title: 'Materials',
    paragraph:
      "Tags like 'Cotton,' 'Polyester,' 'Plush' to specify the material of each plush toy.",
  },
  {
    title: 'Ages',
    paragraph:
      "Tags like 'Kids,' 'Adults,' or specific age ranges to indicate the target audience for each plush toy.",
  },
  {
    title: 'Characters',
    paragraph:
      'Tags that mention the names of specific characters featured in the plush toys',
  },
  {
    title: 'Theme',
    paragraph:
      "Tags to indicate specific themes, such as 'Fantasy,' 'Science Fiction,' 'Marine Animals,' etc.",
  },
] as const
