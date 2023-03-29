import { Container } from '@mui/system'
import Image from 'next/image'

const CustomizedImage = () => {
  return(
    <Container>
        <Image
            src="/images/bao.png"
            alt="A cute dog smiling"
            width={270}
            height={500}
        />
        <p>Ooops! There's nothing to display yet.</p>
    </Container>
  )
}
export default CustomizedImage