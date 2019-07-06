import React from 'react';
import {connect} from "react-redux";
import ListHeader from 'arui-feather/list-header';
import './payments-history.css';

class PaymentsHistory extends React.Component {
    render() {
        return (
            <div className='payments-history' hidden={this.props.payments.length === 0}>
                <ListHeader view='filled' size='xl' title='История платежей'/>
                <ul>
                    {this.props.payments.map((payment) =>
                        <li key={payment.date}>{
                            payment.date.replace(/[a-zA-Z]/, " ").substring(0, payment.date.lastIndexOf('.'))
                        } - Платеж на сумму {payment.sum + payment.currency} с карты {payment.cardNumber}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default connect(
    state => ({
        payments: state
    }),
    null
)(PaymentsHistory)
