import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="w-11/12 flex flex-row justify-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>{icon}</div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="mt-2 text-lg text-white">{title}</h1>
      <p className="mt-2 text-sm md:w-9/12 text-white">{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items gradient-bg-services">
      <div className="flex mf:flex-row items-center justifty-between mf:p-5 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we have
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-start">
        <ServiceCard
          color="bg-[#2952E3]"
          title="security guaranteed"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="privacy and quality guarenteed"
        />
        <ServiceCard
          color="bg-[#8945f8]"
          title="Great Rates"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Best rates in the market"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fast transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="No need to wait here, transactions are lightining fast"
        />
      </div>
    </div>
  );
};

export default Services;
