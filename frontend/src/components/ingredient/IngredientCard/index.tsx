import { CardContainer } from '@/components/common/CardContainer'
import Styles from './IngredientCard.module.css'
import { ImgContainer } from '@/components/common/ImgContainer'

interface Props {
   imageUrl: string
   altImage: string
   imageAuthor: string
   ingredientName: string
   ingredientType: string
   onload: () => void
}

export function IngredientCard({ 
   imageUrl, 
   altImage, 
   imageAuthor, 
   ingredientName, 
   ingredientType 
}: Props) {
   return (
      <CardContainer styleClass={Styles['ingredients-card']}>
         <>
            <ImgContainer styleClass={Styles['ingredients-image']}>
               <img 
                  src={imageUrl}
                  alt={altImage}
                  width='130'
                  height='80'
                  decoding='async'
                  onLoad={() => onload}
               />
            </ImgContainer>
            <h3>Ingredient name: <span>{ingredientName}</span></h3>
            <p>Ingredient type: <span>{ingredientType}</span></p>
            <p>Author: <span>{imageAuthor}</span></p>
         </>
      </CardContainer>
   )
}