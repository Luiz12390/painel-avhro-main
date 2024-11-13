import { Button, Col, Form, Input, Row, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../../components/Loading'
import TitleCreateList from '../../../components/TitleCreate'
import api from '../../../lib/api'
import './styles.css'

function DonationReceivedCreate() {
  const [form] = Form.useForm()

  const [selectDonor, setSelectDonor] = useState([])
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/donor`).then((response) => {
      setSelectDonor(response.data)
    })

    if (id) {
      api.get(`/donation-received/${id}`).then((response) => {
        const { item, donorId, cpf, date } = response.data
        const formattedDate = new Date(date).toISOString().split('T')[0]

        form.setFieldsValue({
          item,
          donorId,
          cpf,
          date: formattedDate,
        })
      })
    }
  }, [form, id])

  const itemsOptions = useMemo(() => {
    const mappedOptions = selectDonor.map((item) => ({
      value: item.id,
      label: item.name,
      cpf: item.cpf,
    }))

    return mappedOptions
  }, [selectDonor])

  const handleDonorSelect = (value, option) => {
    const selectedCpf = option?.cpf || ''

    setCpf(selectedCpf)

    form.setFieldsValue({
      cpf: selectedCpf,
    })
  }

  const onFinish = async (values) => {
    setLoading(true)

    try {
      const donorOption = itemsOptions.find(
        (item) => item.value === values.donorId,
      )

      const sendValues = {
        item: values.item,
        donorId: donorOption.value,
        date: values.date,
      }

      if (id) {
        await api.put(`/donation-received/${id}`, sendValues)
      } else {
        await api.post('/donation-received', sendValues)
      }

      navigate('/donation-received')
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
          textTitle="Cadastro de Doações"
          route="/donation-received"
          create={true}
        />

        <Row
          gutter={[20, 16]}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Col span={20}>
            <Form.Item
              label="Itens Doados"
              name="item"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Campo Obrigatório' }]}
            >
              <Input.TextArea
                style={{
                  height: '112px',
                }}
                placeholder="Descreve os Item que foram doados"
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
              label="Selecione o Doador"
              name="donorId"
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
                options={itemsOptions}
                onChange={handleDonorSelect}
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

          <Col
            span={4}
            offset={8}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default DonationReceivedCreate
