import HeroBanner from "@/components/home/bannar";
import FeaturedStudios from "@/components/home/featured-studios";
import Footer from "@/components/home/footer";
import HostGuaranteeSection from "@/components/home/HostGuaranteeSection";
import HowItWorks from "@/components/home/how-it-works";
import StudioCategories from "@/components/home/studio-categories";
export default function Home() {
  return (
    <div >
      <HeroBanner />
      <StudioCategories />
      <FeaturedStudios />
      <HowItWorks />
      <HostGuaranteeSection/>

      <Footer></Footer>
    </div>
  );
}
