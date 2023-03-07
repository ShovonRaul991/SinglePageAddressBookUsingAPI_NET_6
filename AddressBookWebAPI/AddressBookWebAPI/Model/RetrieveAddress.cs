using System.ComponentModel.DataAnnotations;

namespace AddressBookWebAPI.Model
{
    public class RetrieveAddress
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public string email { get; set; }

        public long phone { get; set; }

        public long landline { get; set; }
        public string website { get; set; }
        public string AddressDetails { get; set; }
    }
}
