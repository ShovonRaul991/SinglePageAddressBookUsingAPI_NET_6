using Microsoft.AspNetCore.Mvc;
using AddressBookWebAPI.Data;
using AddressBookWebAPI.Model;
using AutoMapper;

namespace AddressBookWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : Controller
    {
        private readonly AddressBookAPIDbContext _context;
        private readonly IMapper _mapper;

        public AddressController(AddressBookAPIDbContext db, IMapper mapper)
        {
            _context= db;
            _mapper=mapper;
        }

        [HttpGet]
        [Route("GetAllAddress")]
        public IActionResult Index()
        {
            var totalData = _mapper.Map<IEnumerable<RetrieveAddress>>(_context.Addresses.ToList());
            return Ok(totalData);

        }

        [HttpGet]
        [Route("GetAddress/{id}")]
        public IActionResult GetAddressDetails(int id)
        {
            var tempAddress = _context.Addresses.Find(id);
            if (tempAddress == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<RetrieveAddress>(tempAddress));
        }

        [HttpPost]
        [Route("AddAddress")]
        public IActionResult GetAddress(RetrieveAddress obj)
        {
            /*
            var tempAddress = new Address()
            {
                Name = obj.Name,
                email = obj.email,
                phone = obj.phone,
                landline = obj.landline,
                website = obj.website,
                AddressDetails = obj.AddressDetails,
            };
            */
            var tempAddress = _mapper.Map<Address>(obj);
            _context.Addresses.Add(tempAddress);
            _context.SaveChanges();
            return Ok(tempAddress);
        }

        [HttpPut]
        [Route("UpdateAddress")]
        public IActionResult UpdateAddressDetails(RetrieveAddress obj)
        {
            /*
            var tempAddress = _context.Addresses.Find(id);
            
            if(tempAddress== null)
            {
                return NotFound();
            }
            
            tempAddress.Name = obj.Name;
            tempAddress.email = obj.email;
            tempAddress.phone = obj.phone;
            tempAddress.landline = obj.landline;
            tempAddress.website = obj.website;
            tempAddress.AddressDetails = obj.AddressDetails;
            */
            
            var tempAddress = _mapper.Map<Address>(obj);
            //tempAddress.Id= id;
            _context.Addresses.Update(tempAddress);
            _context.SaveChanges();
            return Ok(tempAddress);
        }

        [HttpDelete]
        [Route("DeleteAddress/{id}")]
        public IActionResult DeleteAddress(int id)
        {
            var tempAddress = _context.Addresses.Find(id);
            if(tempAddress== null)
            {
                return BadRequest();
            }
            _context.Remove(tempAddress);
            _context.SaveChanges();
            return Ok(tempAddress);

        }
    }
}
