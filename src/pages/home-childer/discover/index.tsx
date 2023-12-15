import React, { useEffect, useState } from 'react';
import { Button, Carousel } from 'antd';
import { getBanner } from '@/api/common';
import './index.less';

const prefixCls = 'discover-page';

const DiscoverPage: React.FC = () => {
    const [bannerList, setBannerList] = useState([]);

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const data: any = await getBanner();
        console.log(data);
        setBannerList(data?.banners);
    };

    return (
        <div className={`${prefixCls}`}>
            <div className={`${prefixCls}-carousel`}>
                <Carousel effect="fade" autoplay style={{ width: "100%" }} >
                    {bannerList?.map((banner: any) => {
                        return (
                            <div className={`${prefixCls}-carousel-item`} key={banner?.targetId}>
                                <img style={{ width: '100%' }} src={banner?.imageUrl} />
                                <div className={`${prefixCls}-carousel-item-title`}>
                                    <div className="box-border rounded-[4px] px-[4px]" style={{ backgroundColor: banner?.titleColor }}>
                                        {banner?.typeTitle}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
            <div className={`${prefixCls}-fragment`}>
                <div className={`${prefixCls}-fragment-title`}></div>
                <div className={`${prefixCls}-fragment-title`}></div>
            </div>
        </div>
    );
};

export default DiscoverPage;
