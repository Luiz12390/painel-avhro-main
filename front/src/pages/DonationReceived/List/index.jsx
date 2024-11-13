import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Form, Row, Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loading'
import TitleCreateList from '../../../components/TitleCreate'
import api from '../../../lib/api'

import './styles.css'

function DonationReceivedList() {
  const [listDonationReceived, setListDonationReceived] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    api.get('/donation-received').then((response) => {
      setListDonationReceived(response.data)
    })
  }, [])

  const handleRemove = (id) => {
    api
      .delete(`/donation-received/${id}`)
      .then(() => {
        const updatedList = listDonationReceived.filter(
          (registro) => registro.id !== id,
        )
        setListDonationReceived(updatedList)
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
    const registroParaEditar = listDonationReceived.find(
      (registro) => registro.id === id,
    )

    if (registroParaEditar) {
      navigate(`/donation-received-register/${id}`)
    }
  }

  const columns = [
    {
      title: 'Item doado',
      dataIndex: 'item',
    },
    {
      title: 'Data da doação',
      dataIndex: 'date',
      render: (value) => {
        return dayjs(value).format('DD/MM/YYYY')
      },
    },
    {
      title: 'Doador',
      dataIndex: 'donor',
      render: (value) => {
        return value.name
      },
    },
    {
      title: 'CPF Doador',
      dataIndex: 'donor',
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
              onClick={() => handleEdit(record.id)}
              size="xl"
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
          textTitle="Lista de Doações Recebidas"
          route="/donation-received-register"
          create={false}
        />

        <Row
          gutter={[20, 16]}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Col span={22}>
            <Table
              dataSource={listDonationReceived}
              columns={columns}
              bordered
              rowKey={(record) => record.id}
            />
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default DonationReceivedList
