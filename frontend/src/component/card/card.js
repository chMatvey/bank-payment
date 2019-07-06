import React from 'react';
import Input from 'arui-feather/input';
import CardInput from 'arui-feather/card-input';
import Select from 'arui-feather/select';
import './card.css';
import banksDB from 'banks-db';
import Label from 'arui-feather/label'

const defaultBackgroundColor = '#eee';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '',
            ownerName: '',
            cvc: '',
            month: '01',
            year: '2019',
            isCorrectCardNumber: true,
            isCorrectOwnerName: true,
            isCorrectCVC: true,
            bankName: '',
            bankType: '',
            backgroundColor: defaultBackgroundColor,
        };

        this.handleMoneyChange = this.handleMoneyChange.bind(this);
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    }

    async getCardInfo() {
        const isCorrectCardNumber = this.state.bankType === '' ? false : this.state.isCorrectCardNumber;
        const isCorrectOwnerName = this.state.ownerName === '' ? false : this.state.isCorrectOwnerName;
        const isCorrectCVC = this.state.cvc.length < 3 ? false : this.state.isCorrectCVC;

        await this.setState({
            isCorrectCardNumber: isCorrectCardNumber,
            isCorrectOwnerName: isCorrectOwnerName,
            isCorrectCVC: isCorrectCVC
        });

        return this.state.isCorrectCardNumber && this.state.isCorrectOwnerName && this.state.isCorrectCVC ? {
            cardNumber: this.state.cardNumber,
            owner: this.state.ownerName,
            month: this.state.month,
            year: this.state.year,
            cvc: this.state.cvc,
        } : null
    }

    handleMoneyChange(money) {
        this.setState({money: money});
        this.billingForm = this.billingForm.bind(this)
    }

    handleCardNumberChange(value) {
        const bank = banksDB(value);
        if (bank.code) {
            this.setState({
                bankName: (bank.country === 'ru' ? bank.localTitle : bank.engTitle),
                backgroundColor: bank.color,
                isCorrectCardNumber: true
            })
        } else {
            this.setState({
                bankName: '',
                backgroundColor: defaultBackgroundColor,
                isCorrectCardNumber: value.length < 8
            })
        }

        this.setState({bankType: (bank.type ? bank.type : ''), cardNumber: value});
    }

    render() {
        const thisYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 10; i++) {
            const value = thisYear + i;
            years.push({value: value, text: value})
        }

        const months = [];
        for (let i = 1; i <= 12; i++) {
            const value = i < 10 ? '0' + i : i;
            months.push({value: value, text: value})
        }

        return (
            <div className='card' style={{backgroundColor: this.state.backgroundColor, fontColor: this.state.backgroundColor}}>
                <div className='row'>
                    <Label size='xl' isNoWrap={true}>{this.state.bankName}</Label>
                </div>
                <div className='row'>
                    <CardInput className='long-input' size='xl'
                               placeholder='Введите номер карты'
                               error={!this.state.isCorrectCardNumber ? 'Неверный номер карты' : null}
                               onChange={value => this.handleCardNumberChange(value)}/>
                </div>
                <div className='row'>
                    <Input className='long-input' theme='alfa-on-white' maxLength={26}
                           placeholder='Введите имя держателя карты'
                           size='xl'
                           error={!this.state.isCorrectOwnerName ? 'Только латинские символы' : null}
                           onChange={value => this.setState({
                               ownerName: value,
                               isCorrectOwnerName: /^[a-zA-Z]{1,26}$/i.test(value)
                           })}
                    />
                </div>
                <div className='row'>
                    <div className='column'>
                        <Select size='l' mode='radio' options={months} onChange={
                            value => this.setState({month: value[0]})
                        }/>
                    </div>
                    <div className='column'>
                        <Select size='l' mode='radio' options={years} onChange={
                            value => this.setState({year: value[0]})
                        }/>
                    </div>
                    <div className='column last'>
                        <Input className='cvc-input' size='l'
                               placeholder='CVC' maxLength={3}
                               error={!this.state.isCorrectCVC ? 'Три цифры, на обратной стороне карты' : null}
                               onChange={value => this.setState({
                                   cvc: value,
                                   isCorrectCVC: /^\d{0,3}$/i.test(value)
                               })}
                        />
                    </div>
                </div>
                <div className='row type'>
                    <Label size='xl' isNoWrap={true}>{this.state.bankType}</Label>
                </div>
            </div>
        )
    }
}

export default Card
