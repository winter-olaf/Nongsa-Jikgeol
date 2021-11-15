import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SaleList from '../../components/sale/SaleList'
import { getList } from '../../modules/sale'

const SaleListContainer = () => {
  const dispatch = useDispatch()
  const { num, option, error, loading, list, auth } = useSelector(
    ({ sale, loading }) => ({
      num: sale.num,
      option: sale.option,
      list: sale.list,
      error: sale.error,
      auth: sale.auth,
      loading: loading['sale/GET_LIST'],
    }),
  )
  useEffect(() => {
    dispatch(getList({ num, option }))
  }, [dispatch, num, option])

  return (
    <SaleList
      list={list}
      error={error}
      loading={loading}
      showSalePostButton={auth}
    />
  )
}

export default SaleListContainer
