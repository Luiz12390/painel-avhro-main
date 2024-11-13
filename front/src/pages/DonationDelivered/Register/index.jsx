import { Button, Col, Form, Input, Row, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../components/Loading'
import TitleCreateList from '../../../components/TitleCreate'
import api from '../../../lib/api'
import './styles.css'

function DonationDeliveredCreate() {
  const [form] = Form.useForm()

  const [selectDoador, setSelectDoador] = useState([])
  const [loading, setLoading] = useState(false)
  const [cpf, setCpf] = useState('')

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/donatary`).then((response) => {
      setSelectDoador(response.data)
    })

    if (id) {
      api
        .get(`/donation-delivered/${id}`)
        .then((response) => {
          const { item, donataryId, date, cpf } = response.data

          const formattedDate = new Date(date).toISOString().split('T')[0]

          form.setFieldsValue({
            item,
            donataryId,
            cpf,
            date: formattedDate,
          })
        })
        .finally(() => setLoading(false))
    }
  }, [form, id])

  const itemsOptions = useMemo(() => {
    const mappedOptions = selectDoador.map((item) => ({
      value: item.id,
      label: item.name,
      cpf: item.cpf,
    }))

    return mappedOptions
  }, [selectDoador])

  const handleDoadorSelect = (value, option) => {
    const selectedCpf = option?.cpf || ''

    setCpf(selectedCpf)

    form.setFieldsValue({
      cpf: selectedCpf,
    })
  }

  const onFinish = async (values) => {
    setLoading(true)

    try {
      const donataryOption = itemsOptions.find(
        (item) => item.value === values.donataryId,
      )

      const sendValues = {
        item: values.item,
        donataryId: donataryOption.value,
        date: values.date,
      }

      if (id) {
        await api.put(`/donation-delivered/${id}`, sendValues)
      } else {
        await api.post('/donation-delivered', sendValues)
      }

      navigate('/donation-delivered')
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
          textTitle="Cadastro de Doação Entrega"
          route="/donation-delivered"
          create={true}
        />

        <Row
          gutter={[20, 16]}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Col span={20}>
            <Form.Item
              label="Digite o Item"
              name="item"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <Input.TextArea
                style={{
                  height: '112px',
                }}
                placeholder="Descreve os Item"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row
          gutter={[20, 16]}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Col span={10}>
            <Form.Item
              label="Selecione o Donatário"
              name="donataryId"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <Select
                size="large"
                showSearch
                placeholder="Item"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={handleDoadorSelect}
                options={itemsOptions}
              />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item
              label="CPF"
              name="cpf"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="CPF"
                disabled
                size="large"
                value={cpf}
                style={{ color: 'black' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 16]}>
          <Col span={10} offset={2}>
            <Form.Item
              label="Data de Cadastro"
              name="date"
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

export default DonationDeliveredCreate
