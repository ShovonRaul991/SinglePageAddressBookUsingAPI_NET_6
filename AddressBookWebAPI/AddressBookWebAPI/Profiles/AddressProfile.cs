using AutoMapper;
using AddressBookWebAPI.Data;
using AddressBookWebAPI.Model;

namespace AddressBookWebAPI.Profiles
{
    public class AddressProfile : Profile
    {
        public AddressProfile()
        {
            CreateMap<Address, RetrieveAddress>().ReverseMap();
                //.ForMember(src=>src.phone,opt=>opt.MapFrom(dest=>dest.MobileNumber))
                //.ForMember(src => src.Id, opt => opt.Ignore());
        }

    }
}
