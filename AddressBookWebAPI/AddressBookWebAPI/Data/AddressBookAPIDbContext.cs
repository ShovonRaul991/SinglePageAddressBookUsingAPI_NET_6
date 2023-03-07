using AddressBookWebAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace AddressBookWebAPI.Data
{
    public class AddressBookAPIDbContext : DbContext
    {
        public AddressBookAPIDbContext(DbContextOptions options): base(options)
        {

        }

        public DbSet<Address> Addresses { get; set; }
    }
}
