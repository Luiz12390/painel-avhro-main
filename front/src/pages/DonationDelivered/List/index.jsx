import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Form, Row, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleCreateList from '../../../components/TitleCreate'
import api from '../../../lib/api'

import dayjs from 'dayjs'
import Loader from '../../../components/Loading'
import './styles.css'

function DonationDeliveredList() {
  const [listDonationDelivered, setListDonationDelivered] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    api.get('/donation-delivered').then((response) => {
      setListDonationDelivered(response.data)
    })
  }, [])

  const handleRemove = (id) => {
    setLoading(true)
    api
      .delete(`/donation-delivered/${id}`)
      .then(() => {
        const updatedList = listDonationDelivered.filter(
          (registro) => registro.id !== id,
        )
        setListDonationDelivered(updatedList)
      })
      .catch(
        () =>
          alert(
            'Não foi possível remover o registro, pois ele está vinculado a algum outro registro.',
          ),
        setLoading(false),
      )
      .finally(() => setLoading(false))
  }

  const handleEdit = (id) => {
    setLoading(true)

    const registroParaEditar = listDonationDelivered.find(
      (registro) => registro.id === id,
    )

    if (registroParaEditar) {
      navigate(`/donation-delivered-register/${id}`)
    } else {
      console.log(`Nenhum registro encontrado com o ID ${id}.`)
    }
  }

  const columns = [
    {
      title: 'Item Entregue',
      dataIndex: 'item',
    },
    {
      title: 'Data da Entrega',
      dataIndex: 'date',
      render: (value) => {
        return dayjs(value).format('DD/MM/YYYY')
      },
    },
    {
      title: 'Donatário',
      dataIndex: 'donatary',
      render: (value) => {
        return value.name
      },
    },
    {
      title: 'CPF Donatário',
      dataIndex: 'donatary',
      render: (value) => {
        return value.cpf
      },
    },
    {
      title: 'Ações',
      aling: 'center',
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
    <>
      {loading && <Loader loading={loading} />}

      <Form>
        <TitleCreateList
          textTitle="Listagem Doações Entregues"
          route="/donation-delivered-register"
          create={false}
        />

        <Row
          gutter={[20, 16]}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Col span={22}>
            <Table
              dataSource={listDonationDelivered}
              columns={columns}
              rowKey={(record) => record.id}
              bordered
            />
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default DonationDeliveredList
