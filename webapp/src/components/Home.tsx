import {Container} from 'react-bootstrap';
import ListProducts from '../components/listProducts/ListProducts'

export const Home = () => {
    return (
        <Container className='mt-3 home'>
            <ListProducts/>
        </Container>
    )
}