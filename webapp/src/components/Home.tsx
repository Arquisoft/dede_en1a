import {Container} from 'react-bootstrap';
import ListProducts from '../components/listProducts/ListProducts'

const Home = () => {
    return (
        <Container className='mt-3 home'>
            <ListProducts/>
        </Container>
    )
}
export default Home;