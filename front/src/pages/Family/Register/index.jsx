import { Button, Col, Form, Input, Row } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../components/Loading'
import TitleCreateList from '../../../components/TitleCreate'
import api from '../../../lib/api'
import './styles.css'

function FamilyCreate() {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      api
        .get(`/family/${id}`)
        .then((response) => {
          const { bairro, name, numberMembers, dateRegistration } =
            response.data

          const formattedDate = new Date(dateRegistration)
            .toISOString()
            .split('T')[0]

          form.setFieldsValue({
            bairro,
            name,
            numberMembers,
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
        bairro: values.bairro,
        name: values.name,
        numberMembers: Number(values.numberMembers),
        dateRegistration: values.dateRegistration,
      }

      if (id) {
        await api.put(`/family/${id}`, sendValues)
      } else {
        await api.post('/family', sendValues)
      }
      navigate('/family')
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
          textTitle="Cadastro de Familía"
          route="/family"
          create={true}
        />

        <Row gutter={[20, 16]}>
          <Col span={10} offset={2}>
            <Form.Item
              label="Nome da Familía"
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
          <Col offset={2} span={10}>
            <Form.Item
              label="Bairro"
              name="bairro"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
              wrapperCol={{ span: 24 }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item
              label="Quantidade de Integrantes da Família"
              name="numberMembers"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <Input size="large" type="number" />
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

export default FamilyCreate
