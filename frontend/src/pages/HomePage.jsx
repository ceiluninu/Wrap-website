import Hero from '../components/Hero'
import PopularWraps from '../components/PopularWraps'
import Categories from '../components/Categories'
import FeaturedDeals from '../components/FeaturedDeals'
import WhyUs from '../components/WhyUs'
import Reviews from '../components/Reviews'
import Newsletter from '../components/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularWraps />
      <Categories />
      <FeaturedDeals />
      <WhyUs />
      <Reviews />
      <Newsletter />
    </>
  )
}
