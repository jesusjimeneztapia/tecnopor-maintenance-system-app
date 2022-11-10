import { getAPIURL } from '../../libs/origin'
import axios from 'redaxios'
import Page from '../../components/page'
import styles from '../../styles/machines/Machines.module.css'
import MachineListProvider from '../../context/providers/MachineListContext'
import { FcAddDatabase } from 'react-icons/fc'
import Button from '../../components/Button'
import Link from 'next/link'
import MachineContainer from '../../components/machines/MachineContainer'

export default function Activities({ machines }) {
  return (
    <Page title='Actividades | TECNOPOR S.A.'>
      <h2 className={styles.title}>Actividades</h2>
      {machines.length ? (
        <MachineListProvider machines={machines}>
          <MachineContainer />
        </MachineListProvider>
      ) : (
        <section className={styles.new}>
          <FcAddDatabase size={128} />
          <h4>No existen máquinas registradas</h4>
          <p>Registra tu primera máquina</p>
          <Button variant='primary'>
            <Link href='/machines/register'>
              <a>Registrar Máquina</a>
            </Link>
          </Button>
        </section>
      )}
    </Page>
  )
}

export async function getServerSideProps(context) {
  const api = getAPIURL(context)
  const { data } = await axios.get(`${api}/machines`)

  return {
    props: { machines: data },
  }
}
