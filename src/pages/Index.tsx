import { Helmet } from "react-helmet-async";
import { VirtualShowroom } from "@/components/showroom/VirtualShowroom";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SafetyPro360 - Virtual Industrial Safety Showroom</title>
        <meta 
          name="description" 
          content="Explore our 3D virtual showroom featuring industrial safety equipment including helmets, vests, gloves, boots, respirators, and fall protection gear." 
        />
      </Helmet>
      <VirtualShowroom />
    </>
  );
};

export default Index;
