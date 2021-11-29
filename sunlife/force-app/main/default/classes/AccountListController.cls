public class AccountListController {
	@AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name,Owner.Name, Phone, Website,AnnualRevenue FROM Account WHERE Industry = 'Financial Services'];
    }
}