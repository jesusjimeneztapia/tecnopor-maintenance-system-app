import { Modal } from 'flowbite-react'
import { useMaintenanceRequest } from '../../store/maintenanceRequest'
import { Title } from '@tremor/react'
import MaintenanceRequestForm from './MaintenanceRequestForm'

export default function CreateMaintenanceRequestModal() {
  const [showModal, setShowModal] = useMaintenanceRequest((state) => [
    state.showModal,
    state.setShowModal,
  ])

  if (!showModal) {
    return <></>
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <Modal
      className='h-screen'
      show={true}
      onClose={handleClose}
      position='top-center'
      size='3xl'
      dismissible
    >
      <Modal.Header>Nueva solicitud de mantenimiento</Modal.Header>
      <Modal.Body className='max-sm:px-4 max-sm:pt-2'>
        <Title className='mb-5'>Crear solicitud</Title>
        <div className='p-1 gap-4 max-h-[calc(100vh-13rem)] max-sm:max-h-[calc(100vh-12rem)] overflow-y-auto'>
          <MaintenanceRequestForm />
        </div>
      </Modal.Body>
    </Modal>
  )
}
