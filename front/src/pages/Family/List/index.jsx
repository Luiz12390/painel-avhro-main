import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Form, Row, Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleCreateList from '../../../components/TitleCreate'
import api from '../../../lib/api'

import Loader from '../../../components/Loading'
import './styles.css'

function FamilyList() {
  const [loading, setLoading] = useState(false)
  const [listFamilia, setListFamilia] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/family').then((response) => {
      setListFamilia(response.data)
    })
  }, [])

  const handleRemove = (id) => {
    setLoading(true)
    api
      .delete(`/family/${id}`)
      .then(() => {
        const updatedList = listFamilia.filter((registro) => registro.id !== id)
        setListFamilia(updatedList)
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
    const registroParaEditar = listFamilia.find(
      (registro) => registro.id === id,
    )

    if (registroParaEditar) {
      navigate(`/family-register/${id}`)
    }
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Numero de Integrantes',
      dataIndex: 'numberMembers',
    },
    {
      title: 'Bairro',
      dataIndex: 'bairro',
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
          textTitle="Listagem de Familía"
          route="/family-register"
          create={false}
        />

        <Row
          gutter={[20, 16]}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Col span={22}>
            <Table
              dataSource={listFamilia}
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

export default FamilyList
