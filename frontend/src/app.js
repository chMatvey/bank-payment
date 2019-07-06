import React from 'react';
import {connect} from "react-redux";
import Input from 'arui-feather/input';
import RadioGroup from 'arui-feather/radio-group';
import Radio from 'arui-feather/radio';
import Card from './component/card/card';
import Button from "arui-feather/button";
import axios from 'axios';
import Label from 'arui-feather/label';
import PaymentsHistory from './component/payments-history/payments-history';

const url = "";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sum: '',
            currency: '₽',
            isCorrectSum: true,
            paymentResultInfo: ''
        };

        this.card = React.createRef();
    }

    async handleSubmit() {
        const isCorrectSum = this.state.sum === '' ? false : this.state.isCorrectSum;
        await this.setState({isCorrectSum: isCorrectSum});

        const cardInfo = await this.card.current.getCardInfo();

        if (cardInfo !== null && this.state.isCorrectSum) {
            cardInfo.sum = this.state.sum;
            cardInfo.currency = this.state.currency;
            axios.post(url, cardInfo)
                .then(res => {
                    this.props.onAddPayment(res.data);
                    this.setState({
                        paymentResultInfo: "Платеж выполнен!",
                        sum: ''
                    });
                })
                .catch(error => {
                    this.setState({
                        paymentResultInfo: "Платеж не выполнен, "
                            + (error.toString().search(/code 4\d{2}/) !== -1 ? 'ошибка клиента!' : 'ошибка сервера!')
                    });
                })
                .finally(_ => {
                    setTimeout(_ => {
                        this.setState({paymentResultInfo: ''})
                    }, 5000)
                })
        }
    }

    render() {
        return (
            <div className='app'>
                <div className='row payment-result-info'>
                    <Label size='xl'>
                        {this.state.paymentResultInfo}
                    </Label>
                </div>
                <div className='row sum'>
                    <Input size='xl' placeholder='Введите сумму' type='number'
                           error={!this.state.isCorrectSum ? 'Сумма платежа д.б. больше нуля' : null}
                           value={this.state.sum}
                           onChange={value => this.setState({
                               sum: value,
                               isCorrectSum: Number(value) > 0
                           })}
                           rightAddons={
                               <RadioGroup type='button'
                                           onChange={(value, isChecked) => this.setState({currency: value})}>
                                   {
                                       ['₽', '$', '€'].map(item => (
                                           <Radio
                                               key={item}
                                               size='s'
                                               text={item}
                                               type='button'
                                               value={item}
                                           />
                                       ))
                                   }
                               </RadioGroup>
                           }/>
                </div>
                <div className='row'>
                    <Card ref={this.card}/>
                </div>
                <div className='row payment-btn'>
                    <Button view='extra' size='xl' onClick={this.handleSubmit.bind(this)}>Оплатить</Button>
                </div>
                <div className='row'>
                    <PaymentsHistory/>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => ({
        onAddPayment: payment => {
            dispatch({type: 'ADD_PAYMENT', payload: payment})
        }
    })
)(App)


