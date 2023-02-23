import { useMutation, useQuery } from '@tanstack/react-query'
// eslint-disable-next-line import/no-named-as-default
import produce from 'immer'
import keyBy from 'lodash/keyBy'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import no_product from 'src/assets/images/no-product.png'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const location = useLocation()
  const choosePurchaseIdFromLocation = (location.state as { purchaseId: string | null })?.purchaseId
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases(purchasesStatus.inCart),
  })
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = useMemo(() => extendedPurchases.every(purchase => purchase.checked), [extendedPurchases])
  const checkedPurchases = useMemo(() => extendedPurchases.filter(purchase => purchase.checked), [extendedPurchases])
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((total, purchase) => {
        return total + purchase.price * purchase.buy_count
      }, 0),
    [checkedPurchases],
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((total, purchase) => {
        return total + (purchase.price_before_discount - purchase.price) * purchase.buy_count
      }, 0),
    [checkedPurchases],
  )
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    },
  })
  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: data => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000,
      })
    },
  })
  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    },
  })

  useEffect(() => {
    if (purchasesInCart) {
      setExtendedPurchases(prev => {
        const extendedPurchasesObject = keyBy(prev, '_id')
        return purchasesInCart.map(purchase => {
          const isChoosePurchaseIdFromLocation = choosePurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            checked: isChoosePurchaseIdFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked),
            disabled: false,
          }
        })
      })
    }
  }, [purchasesInCart, choosePurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce(draft => {
        draft[purchaseIndex].checked = event.target.checked
      }),
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases(prev => prev.map(purchase => ({ ...purchase, checked: !isAllChecked })))
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce(draft => {
          draft[purchaseIndex].disabled = true
        }),
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce(draft => {
        draft[purchaseIndex].buy_count = value
      }),
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchase = () => {
    const purchaseIds = checkedPurchases.map(purchase => purchase._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map(purchase => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count,
      }))
      buyProductsMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchases?.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='mb-5  grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={purchase.checked}
                                onChange={handleChecked(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex items-center'>
                                <Link
                                  className='h-20 w-20 flex-shrink-0'
                                  to={`${path.home}${generateNameId(purchase.product.name, purchase.product._id)}`}
                                >
                                  <img alt={purchase.product.name} src={purchase.product.image} />
                                </Link>
                                <div className='flex-grow px-2 pt-1 pb-2 text-left'>
                                  <Link
                                    to={`${path.home}${generateNameId(purchase.product.name, purchase.product._id)}`}
                                    className='line-clamp-2'
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price_before_discount)}
                                </span>
                                <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex items-center'
                                disabled={purchase.disabled}
                                onIncrease={value => handleQuantity(index, value, value <= purchase.product.quantity)}
                                onDecrease={value => handleQuantity(index, value, value >= 1)}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={value =>
                                  handleQuantity(
                                    index,
                                    value,
                                    purchase.buy_count >= 1 &&
                                      purchase.buy_count <= purchase.product.quantity &&
                                      value !== (purchasesInCart as Purchase[])[index].buy_count,
                                  )
                                }
                              />
                            </div>
                            <div className='col-span-1'>
                              <span className='text-orange'>
                                ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                className='bg-none text-black transition-colors hover:text-orange'
                                onClick={handleDelete(index)}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                  Chọn tất cả
                </button>
                <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchase}>
                  Xóa
                </button>
              </div>

              <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán ({checkedPurchases.length} sản phẩm):</div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                  onClick={handleBuyPurchases}
                  disabled={buyProductsMutation.isLoading}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <img src={no_product} alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
