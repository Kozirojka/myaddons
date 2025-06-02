/** @odoo-module **/
import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
export class PartnerListing extends Component {
    static template = "partner_website_listing.PartnerListing";
    setup() {
        this.state = useState({
            partners: [],
            isLoading: true,
            error: null,
            filter: '',
            view: 'kanban' // or 'list'
        });
        this.loadPartners();
    }
    async loadPartners() {
        try {
            const result = await rpc(
                '/partners/data'
            );
            this.state.partners = result.partners;
        } catch (error) {
            this.state.error = error.message;
        } finally {
            this.state.isLoading = false;
        }
    }
    get filterPartners() {
        const searchTerm = this.state.filter.toLowerCase();
        return this.state.partners.filter(partner =>
            partner.name.toLowerCase().includes(searchTerm) ||
            partner.city?.toLowerCase().includes(searchTerm) ||
            partner.country?.toLowerCase().includes(searchTerm)
        );
    }
    getAddress (partner) {
        const address = [partner.city, partner.country].filter(Boolean).join(', ')
        return address
    }
    toggleView() {
        this.state.view = this.state.view === 'kanban' ? 'list' : 'kanban';
    }
}
registry.category("public_components").add(
    "partner_website_listing.PartnerListing",
    PartnerListing
);