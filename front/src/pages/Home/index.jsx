import { Col, Row } from 'antd'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useEffect, useRef, useState } from 'react'
import image from '../../components/assets/image3.png'
import api from '../../lib/api'
import './styles.less'

function Home() {
  const chartRef = useRef(null)
  const chartRefDonor = useRef(null)
  const [family, setFamily] = useState([])
  const [donationsRelivered, setDonationsRelivered] = useState([])
  const [donationsReceived, setDonationsReceived] = useState([])
  const [donor, setDonor] = useState([])
  const [donatary, setDonatary] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          familyResponse,
          donationsReceivedResponse,
          donationsReliveredResponse,
        ] = await Promise.all([
          api.get('/family'),
          api.get('/donation-received'),
          api.get('/donation-delivered'),
        ])

        setFamily(familyResponse.data)
        setDonationsReceived(donationsReceivedResponse.data)
        setDonationsRelivered(donationsReliveredResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (
      family.length > 0 ||
      donationsReceived.length > 0 ||
      donationsRelivered.length > 0
    ) {
      const data = {
        labels: ['Doações recebidas', 'Doações Entregues', 'Familias'],
        datasets: [
          {
            data: [
              donationsReceived.length,
              donationsRelivered.length,
              family.length,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            formatter: (value) => {
              return value || ''
            },
            color: 'black',
            anchor: 'end',
            align: 'start',
            offset: 6,
          },
        },
      }

      const ctx = chartRef.current.getContext('2d')
      const newChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data,
        options,
        plugins: [ChartDataLabels],
      })

      return () => {
        newChartInstance.destroy()
      }
    }
  }, [donationsReceived.length, donationsRelivered.length, family.length])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donorResponse, donataryResponse] = await Promise.all([
          api.get('/donor'),
          api.get('/donatary'),
        ])

        setDonor(donorResponse.data)
        setDonatary(donataryResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (donor.length > 0 || donatary.length > 0) {
      const data = {
        labels: ['Doadores', 'Donatário'],
        datasets: [
          {
            data: [donor.length, donatary.length],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            formatter: (value) => {
              return value || ''
            },
            color: 'black',
            anchor: 'end',
            align: 'start',
            offset: 8,
          },
        },
      }

      const ctx = chartRefDonor.current.getContext('2d')
      const newChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data,
        options,
        plugins: [ChartDataLabels],
      })

      return () => {
        newChartInstance.destroy()
      }
    }
  }, [donor.length, donatary.length])

  return (
    <div>
      <Row className="image">
        <img src={image} alt="" height="350" width="80%" />
      </Row>

      <div className="title">
        <span className="text-title">Dashboard do Sistema</span>
      </div>

      <Row gutter={[20, 16]} className="quadrados">
        <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="quadrado">
            <canvas ref={chartRef} width={200} height={200}></canvas>
          </div>
        </Col>

        <Col
          span={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="quadrado">
            <canvas ref={chartRefDonor} width={200} height={200}></canvas>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Home
