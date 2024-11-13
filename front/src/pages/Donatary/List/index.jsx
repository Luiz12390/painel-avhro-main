import { Col, Form, Row, Table } from 'antd'

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loading'
import TitleCreateList from '../../../components/TitleCreate'
import api from '../../../lib/api'
import './styles.css'

function DonaratyList() {
  const [loading, setLoading] = useState(false)
  const [listDonaraty, setListDonaraty] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    api.get('/donatary').then((response) => {
      setListDonaraty(response.data)
    })
  }, [])

  const handleRemove = (id) => {
    setLoading(true)

    api
      .delete(`/donatary/${id}`)
      .then(() => {
        const updatedList = listDonaraty.filter(
          (registro) => registro.id !== id,
        )
        setListDonaraty(updatedList)
      })
      .finally(() => setLoading(false))
  }

  const handleEdit = (id) => {
    const registroParaEditar = listDonaraty.find(
      (registro) => registro.id === id,
    )

    if (registroParaEditar) {
      navigate(`/donatary-register/${id}`)
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
          textTitle="Listagem de Donatários"
          route="/donatary-register"
          create={false}
        />

        <Row
          gutter={[20, 16]}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Col span={22}>
            <Table
              dataSource={listDonaraty}
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

export default DonaratyList
