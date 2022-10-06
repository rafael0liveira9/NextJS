import styles from '../styles/Home.module.css';
import {useState, useEffect} from 'react';
import Searchinput from './Searchinput';
import sortBy from 'sort-by';

const URL_API = "https://gdp-prd-clube.s3.amazonaws.com/api/repository/partners/all.json";

// principal
export default function Home() {
    const [text, setText] = useState ('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const lowerText = text.toLowerCase();
// importando json  
    const fetchAllData = async () => {
      try{
        setLoading(true)

        const response = await fetch(`${URL_API}`)
        const data = await response.json()

        if (!data) throw 'Erro na Requisição'
        setData(data);
        
      } catch (error){
        console.log(error)
      } finally {
        setLoading(false)
      }

    }
//definindo loop
    useEffect(() => {
      fetchAllData()
    }, [text])

  return (
    //cabeçalho + card
    <div className={styles.App}>
      <div className={styles.header}>
      <div className={styles.headerTitle}>
        <img src="./img/imgclubegazeta-beneficios-logo-gazetadopovo.png" alt="logo" className={styles.headerImg}/>
        <h1>LISTA DE PARCEIROS</h1>
      </div>
      <div className={styles.headerSearch}>
      <Searchinput value={text} onChange={(search) => setText(search)} placeholder="Pesquisar"></Searchinput>
      <img src="./img/search.png" width="20" height="20" alt="logo" className={styles.headerImgS}/>      
      </div>
      </div>
      

  
      {loading && !data &&
        <p>Carregando informações...</p>
      }
      <div className={styles.cardLista}>
      
      {data && data.sort(sortBy('fantasyName')).filter((item) => item.fantasyName.toLowerCase().includes(`${lowerText}`)).map((item) => (
        
        <li key={item.id} className={styles.cardParceiro}>
          <img className={styles.cardImage} src={`https://clube-static.clubegazetadopovo.com.br/${item.logo}`} alt={item.fantasyName} width="297" height="198"></img>
          <div className={styles.cardContent}>
            <div className={styles.cardInfo}>
              <p className={styles.cardNome}>
                  {item.fantasyName}<br></br><br></br>
                  ID: {item.id}<br></br>                 
                  Desconto: {item.discountAmount}%
              </p>
            </div>
            <div className={styles.cardFooter}>
                <button type="submit" className={styles.cardButton} value=""> Ver Mais... </button>
             </div>
            </div>
        </li> 
        
      ))}
      </div>
    </div>
  )
}