/**
 * Shopware 4.0
 * Copyright © 2012 shopware AG
 *
 * According to our dual licensing model, this program can be used either
 * under the terms of the GNU Affero General Public License, version 3,
 * or under a proprietary license.
 *
 * The texts of the GNU Affero General Public License with an additional
 * permission and of our proprietary license can be found at and
 * in the LICENSE file you have received along with this program.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * "Shopware" is a registered trademark of shopware AG.
 * The licensing of the program under the AGPLv3 does not imply a
 * trademark license. Therefore any rights, title and interest in
 * our trademarks remain entirely with us.
 *
 * @category   Shopware
 * @package    Order
 * @subpackage View
 * @copyright  Copyright (c) 2012, shopware AG (http://www.shopware.de)
 * @version    $Id$
 * @author shopware AG
 */

//{namespace name=backend/order/main}

/**
 * Shopware UI - Order detail page
 *
 * todo@all: Documentation
 */
//{block name="backend/order/view/detail/detail"}
Ext.define('Shopware.apps.Order.view.detail.Detail', {

    /**
     * Define that the additional information is an Ext.panel.Panel extension
     * @string
     */
    extend:'Ext.form.Panel',

    /**
     * List of short aliases for class names. Most useful for defining xtypes for widgets.
     * @string
     */
    alias:'widget.order-detail-panel',

    /**
     * An optional extra CSS class that will be added to this component's Element.
     */
    cls: Ext.baseCSSPrefix + 'detail-panel',

    /**
     * A shortcut for setting a padding style on the body element. The value can either be a number to be applied to all sides, or a normal css string describing padding.
     */
    bodyPadding: 10,

    /**
     * True to use overflow:'auto' on the components layout element and show scroll bars automatically when necessary, false to clip any overflowing content.
     */
    autoScroll: true,

    /**
     * Contains all snippets for the view component
     * @object
     */
    snippets:{
        title: '{s name=detail/window_title}Details{/s}',
        notice: '{s name=detail/notice}Adjustments in this form, have only effect on the current order{/s}',
        shop: {
            title: '{s name=detail/shop/title}Shop configuration{/s}',
            label: '{s name=detail/shop/label}Shop{/s}'
        },
        cancel:'{s name=detail/cancel}Cancel{/s}',
        save:'{s name=detail/save}Save{/s}'
    },

    /**
	 * The initComponent template method is an important initialization step for a Component.
     * It is intended to be implemented by each subclass of Ext.Component to provide any needed constructor logic.
     * The initComponent method of the class being created is called first,
     * with each initComponent method up the hierarchy to Ext.Component being called thereafter.
     * This makes it easy to implement and, if needed, override the constructor logic of the Component at any step in the hierarchy.
     * The initComponent method must contain a call to callParent in order to ensure that the parent class' initComponent method is also called.
	 *
	 * @return void
	 */
    initComponent:function () {
        var me = this;

        me.registerEvents();
        me.items = [
            me.createNoticeContainer(),
            me.createShopContainer(),
			Ext.create('Shopware.apps.Order.view.detail.Billing', { record: me.record, countriesStore: me.countriesStore }),
			Ext.create('Shopware.apps.Order.view.detail.Shipping', { record: me.record, paymentsStore: me.paymentsStore, countriesStore: me.countriesStore }),
			Ext.create('Shopware.apps.Order.view.detail.Debit', { record: me.record, paymentsStore: me.paymentsStore })
        ];
        me.buttons = me.createButtons();

        me.title = me.snippets.title;
        me.callParent(arguments);
        me.loadRecord(me.record);
    },

    /**
     * Creates the form button save and cancel
     */
    createButtons: function() {
        var me = this,
            buttons = [];

        var cancelButton = Ext.create('Ext.button.Button', {
            text:me.snippets.cancel,
            scope:me,
            cls: 'secondary',
            handler:function () {
                me.record.reject();
                me.loadRecord(me.record);
            }
        });
        buttons.push(cancelButton);

        var saveButton = Ext.create('Ext.button.Button', {
            text:me.snippets.save,
            action:'save-order',
            cls:'primary',
            handler: function() {
                me.getForm().updateRecord(me.record);
                me.fireEvent('saveDetails', me.record, {
                    callback: function(order) {
                        me.fireEvent('updateForms', order, me.up('window'));
                    }
                })
            }
        });
        buttons.push(saveButton);

        return buttons;
    },

    /**
     * Registers the custom component events.
     * @return void
     */
    registerEvents: function() {
        this.addEvents(
            /**
             * Event will be fired when the user clicks the "Save internal comment" button
             * which is placed in the communication panel at the bottom of the internal field set.
             *
             * @event
             * @param [Ext.data.Model] record - The current form record
             */
            'saveDetails',

            /**
             * Event will be fired when the user clicks the "Save button" button.
             *
             * @event
             * @param [Ext.data.Model]    record - The current form record
             * @param [Ext.window.window] window - The detail window
             */
            'updateForms'
        );
    },

    /**
     * Creates the notice container which is displayed on top of the detail tab panel.
     * @return {[object]}
     */
    createNoticeContainer: function() {
        var me = this;

        return Shopware.Notification.createBlockMessage(me.snippets.notice, 'notice');
    },

    /**
     * Creates the field set for the shop combo box which is placed on top of the details tab panel.
     * @return Ext.form.FieldSet
     */
    createShopContainer: function() {
        var me = this;

        return Ext.create('Ext.form.FieldSet', {
            title: me.snippets.shop.title,
            layout: 'anchor',
            items: [
                {
                    xtype:'combobox',
                    queryMode: 'local',
                    labelStyle: 'font-weight: 700;',
                    margin: '0 0 10px',
                    anchor:'97%',
                    triggerAction:'all',
                    labelWidth: 120,
                    name:'shopId',
                    fieldLabel: me.snippets.shop.label,
                    store: me.shopsStore,
                    valueField: 'id',
                    displayField: 'name',
                    allowBlank: false,
                    editable: false
                }
            ]
        });
    }
});
//{/block}
