export type TypeProduct = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  gender: string
  sizes: {
    quantity: string
    size: string
  }[]
}

export type TypeActionReturn = { type: string; payload: any }
