import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Form, Row, Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleCreateList from '../../../components/TitleCreate'
import api from '../../../lib/api'
import './styles.css'

function DonorList() {
  const [listDonor, setListDonor] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/donor').then((response) => {
      setListDonor(response.data)
    })
  }, [])

  const handleRemove = (id) => {
    api.delete(`/donor/${id}`).then(() => {
      const updatedList = listDonor.filter((registro) => registro.id !== id)
      setListDonor(updatedList)
    })
  }

  const handleEdit = (id) => {
    const registroParaEditar = listDonor.find((registro) => registro.id === id)

    if (registroParaEditar) {
      navigate(`/donor-register/${id}`)
    }
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
    },
    {
      title: 'Data de Cadastro',
      dataIndex: 'dateRegistration',
      render: (value) => {
        return dayjs(value).format('DD/MM/YYYY')
      },
    },
    {
      title: 'Ações',
      align: 'center',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FontAwesomeIcon
              icon={faEdit}
              style={{ marginRight: '20px', cursor: 'pointer' }}
              size="xl"
              onClick={() => handleEdit(record.id)}
            />

            <FontAwesomeIcon
              icon={faTrash}
              size="xl"
              style={{ cursor: 'pointer' }}
              onClick={() => handleRemove(record.id)}
            />
          </div>
        )
      },
    },
  ]

  return (
    <Form>
      <TitleCreateList
        textTitle="Listagem de Doadores"
        route="/donor-register"
        create={false}
      />

      <Row
        gutter={[20, 16]}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Col span={22}>
          <Table
            dataSource={listDonor}
            columns={columns}
            bordered
            rowKey={(record) => record.id}
          />
        </Col>
      </Row>
    </Form>
  )
}

export default DonorList
