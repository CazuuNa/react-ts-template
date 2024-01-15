import React, { Fragment, useEffect, useState } from 'react'
import { Spin, Carousel,Image } from 'antd'
import { getBanner, getPersonalized } from '@/api/common'
import { useNavigate } from 'react-router-dom'
import './index.less'
import CardItem from '@/components/card-item'

const prefixCls = 'discover-page'

const DiscoverPage: React.FC = () => {
	const navigateTo = useNavigate()
	const [loading, setLoading] = useState(true)
	const [bannerList, setBannerList] = useState([])
	const [personalizedList, setPersonalizedList] = useState([])

	useEffect(() => {
		initData()
	}, [])

	const initData = async () => {
		Promise.all([getBanner(), getPersonalized()]).then((res: any) => {
			console.log(res)
			setBannerList(res[0]?.banners)
			setPersonalizedList(res[1]?.result)
			setLoading(false)
		})
	}

	return (
		<Fragment>
			{loading ? (
				<Spin className={`${prefixCls}`} spinning={loading}></Spin>
			) : (
				<div className={`${prefixCls} scroll`}>
					<div className={`${prefixCls}-carousel`}>
						<Carousel effect="fade" autoplay style={{ width: '100%' }}>
							{bannerList?.map((banner: any) => {
								return (
									<div
										className={`${prefixCls}-carousel-item`}
										key={banner?.targetId}
                                        
									>
										<Image width='100%'  src={banner?.imageUrl} />
										<div className={`${prefixCls}-carousel-item-title`}>
											<div
												className="box-border rounded-[4px] px-[4px]"
												style={{ backgroundColor: banner?.titleColor }}
											>
												{banner?.typeTitle}
											</div>
										</div>
									</div>
								)
							})}
						</Carousel>
					</div>
					<div className={`${prefixCls}-fragment`}>
						<div className={`${prefixCls}-fragment-title`}>推荐歌单</div>
						<div className={`${prefixCls}-fragment-content`}>
							{personalizedList?.map((item: any) => {
								return (
									<CardItem
										key={item.id}
										data={item}
										toClick={() => {
                                            // console.log(123);
                                            
                                            navigateTo('playlist-detail',{state:{id:item.id}})
										}}
										style={{
											width: '20%'
										}}
									/>
								)
							})}
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)
}

export default DiscoverPage
