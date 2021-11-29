import { LightningElement ,api, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountListController.getAccountList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Accountlist extends LightningElement {
    @track columns = [{
        label: 'Account name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Owner Name',
        fieldName: 'Owner.Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Annual Revenue',
        fieldName: 'AnnualRevenue',
        type: 'Currency',
        sortable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
        sortable: true
    },
    {
        label: 'Website',
        fieldName: 'Website',
        type: 'url',
        sortable: true
    },
    {
        type: 'action',
        typeAttributes: { rowActions: [
            { label: 'Edit', name: 'edit' },
        ] },
    }
    ];
    @track error;
    @track accountId;
    @track textValue;
    @track accList ;
    @track mainList ;
    @track isModalOpen = false;

    @wire(getAccountList)
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.accList = data;
            this.mainList = data;
            console.log(this.accList)
        } else if (error) {
            this.error = error;
        }
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'edit':
                this.showEditRecord(row);
                break;
            default:
        }
    }

    showEditRecord(row){
        this.accountId = row.Id;
        console.log(JSON.parse(JSON.stringify(row)));
        console.log(this.accountId);
        this.openModal();
    }
    openModal() {
        this.isModalOpen = true;
    }
    onSubmit() {
        this.isModalOpen = false;
        const event = new ShowToastEvent({
            title: 'Success!',
            variant : 'success',
            message: 'Record is updated successfully',
        });
        this.dispatchEvent(event);
    }
    
    closeModal() {
        this.isModalOpen = false;
    }

    handleInputChange(event) {
        this.textValue = event.detail.value;
        console.log(this.textValue)
        var newList = [];
        if(!this.textValue){
            newList = this.mainList;
        }else{
            this.mainList.forEach(element => {
                if(element.Name.includes(this.textValue)){
                    newList.push(element);
                }
            });
        }
       

        this.accList = newList;
    }
}