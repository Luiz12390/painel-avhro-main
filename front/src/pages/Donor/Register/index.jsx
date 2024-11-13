import { Button, Col, Form, Input, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../components/Loading'
import TitleCreateList from '../../../components/TitleCreate'
import api from '../../../lib/api'

function DonorCreate() {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      api
        .get(`/donor/${id}`)
        .then((response) => {
          const { name, cpf, dateRegistration } = response.data

          const formattedDate = new Date(dateRegistration)
            .toISOString()
            .split('T')[0]

          form.setFieldsValue({
            name,
            cpf,
            dateRegistration: formattedDate,
          })
        })
        .finally(() => setLoading(false))
    }
  }, [form, id])

  const onFinish = async (values) => {
    setLoading(true)

    try {
      const sendValues = {
        name: values.name,
        cpf: values.cpf,
        dateRegistration: values.dateRegistration,
      }

      if (id) {
        await api.put(`/donor/${id}`, sendValues)
      } else {
        await api.post('/donor', sendValues)
      }

      navigate('/donor')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Loader loading={loading} />}

      <Form form={form} onFinish={onFinish}>
        <TitleCreateList
          textTitle="Cadastro de Doador"
          route="/donor"
          create={true}
        />

        <Row gutter={[20, 16]}>
          <Col span={10} offset={2}>
            <Form.Item
              label="Nome"
              name="name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              label="CPF"
              name="cpf"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 16]}>
          <Col span={10} offset={2}>
            <Form.Item
              label="Data de Cadastro"
              name="dateRegistration"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <Input type="date" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 16]}>
          <Col offset={20}>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default DonorCreate
