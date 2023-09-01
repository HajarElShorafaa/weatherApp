context("WeatherApp",()=>{
    let priceArray=[];

    it("page One",()=>{
        let choice;
        const degree=(temp)=>{
            if(temp<19){
            cy.get(".btn").contains("Buy moisturizers").click({force:true});
                return "moist"}
            else if(temp>34)
                return "sunscreen"
        }
        cy.visit("https://weathershopper.pythonanywhere.com/");
        cy.get("#temperature").invoke("text").then((Temp)=>{
            let thenum=Math.floor(Temp.match(/\d+/)[0])
            cy.log(thenum)
            if(thenum<19){
                cy.get(".btn").contains("Buy moisturizers").click({force:true});
            }else if(thenum>34){
                cy.get(".btn").contains("Buy sunscreens").click({force:true});
            }
        })
        cy.get('h2').invoke("text").then((PageName)=>{
            if(PageName=="Moisturizers")
            {
                let priceArray=[];
                let MinIndex;
                let MinIndex2;
                let Total=0;
                cy.get('[class="container"] [class*="top-space-50"] [class*="text-center"]')
                .each((elem,index,list)=>{
                    cy.wrap(elem)
                    .children()
                    .eq(1)
                    .invoke("text")
                    .then((data)=>{
                        if(!data.includes("Aloe")){
                            priceArray.push(100000);
                        }
                        else {
                            cy.wrap(elem)
                            .children()
                            .eq(2)
                            .invoke("text")
                            .then((price)=>{
                                cy.log(price)
                                let priceNum=Math.floor(price.match(/\d+/)[0]);
                                priceArray.push(priceNum)
                            }) 
                        }
                    })
                })
                .then(()=>{
                     MinIndex=priceArray.indexOf(Math.min(...priceArray))
                     Total+=priceArray[MinIndex];                  
                    priceArray[MinIndex]=100000

                    MinIndex2=priceArray.indexOf(Math.min(...priceArray))
                    Total+=priceArray[MinIndex2];                  
                    cy.log("MinIndex2 is"+MinIndex2)
                    cy.log(Total);
                }).then(()=>{
                    cy.get('[class="container"] [class*="top-space-50"] [class*="text-center"]')
                    .eq(MinIndex)
                    .children()
                    .eq(3)
                    .click();
                    cy.get('[class="container"] [class*="top-space-50"] [class*="text-center"]')
                    .eq(MinIndex2)
                    .children()
                    .eq(3)
                    .click();
                })
                cy.get('[onclick="goToCart()"]').click();
                cy.get("#total").invoke("text").then((sum)=>{
                   let TheSum=Math.floor(sum.match(/\d+/)[0])
                   cy.wrap(TheSum).should('eq',Total);
                })}
            else if(PageName=="Sunscreens")
            {
                let priceArray=[];
                let MinIndex;
                let MinIndex2;
                let Total=0;
                cy.get('[class="container"] [class*="top-space-50"] [class*="text-center"]')
                .each((elem,index,list)=>{
                    cy.wrap(elem)
                    .children()
                    .eq(1)
                    .invoke("text")
                    .then((data)=>{
                        if(!data.includes("SPF-50")){
                            priceArray.push(100000);
                        }
                        else {
                            cy.wrap(elem)
                            .children()
                            .eq(2)
                            .invoke("text")
                            .then((price)=>{
                                cy.log(price)
                                let priceNum=Math.floor(price.match(/\d+/)[0]);
                                priceArray.push(priceNum)
                            }) 
                        }
                    })
                })
                .then(()=>{
                    MinIndex=priceArray.indexOf(Math.min(...priceArray))
                    Total+=priceArray[MinIndex];                  
                   priceArray[MinIndex]=100000

                   MinIndex2=priceArray.indexOf(Math.min(...priceArray))
                   Total+=priceArray[MinIndex2];                  
                   cy.log("MinIndex2 is"+MinIndex2)
                   cy.log(Total);
                }).then(()=>{
                    cy.get('[class="container"] [class*="top-space-50"] [class*="text-center"]')
                    .eq(MinIndex)
                    .children()
                    .eq(3)
                    .click();
                    cy.get('[class="container"] [class*="top-space-50"] [class*="text-center"]')
                    .eq(MinIndex2)
                    .children()
                    .eq(3)
                    .click();
                })
                cy.get('[onclick="goToCart()"]').click();
                cy.get("#total").invoke("text").then((sum)=>{
                   let TheSum=Math.floor(sum.match(/\d+/)[0])
                   cy.wrap(TheSum).should('eq',Total);
                })
            }
            cy.get('[type="submit"]').click();
            cy.get('form').within((modal)=>{
                cy.wrap(modal)
                .children()
                .eq(1)
                .click({force:true});
            })
            
            cy.get('[id="email"]').type("email@mail.com");
            cy.get('[id="card_number"]').type("5431 1111 1111 1111");
            cy.get('[id="cc-exp"]').type("1225");
            cy.get('[id="cc-csc"]').type("111");
            cy.get('[class="iconTick"]').click();
            cy.get('h2').should('include','PAYMENT SUCCESS')
        
        })
        // .then(($span)=>{
        //     const $try=$span.text()
        //     let thenum=Math.floor($try.match(/\d+/)[0])
        //     cy.log(thenum)
        //     cy.get($span.text()).should('include.text','19');
        //     choice=degree($span.text());
        //     if(choice=="moist")
        //     cy.get(".btn").contains("Buy moisturizers").click({force:true});
        //     else if(choice=="sunscreen")
        //     cy.get(".btn").contains("Buy sunscreens").click({force:true});
        // })
        // cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3)').log();
        // cy.get(':nth-child(2) > :nth-child(3) > .btn').click({force:true});
        // cy.get(':nth-child(2) > :nth-child(3) > .btn').parent().find()
        // cy.get(':nth-child(2) > .btn').click({force:true});
        // cy.get('.thin-text').click({force:true});
        // cy.get('#total').contains('Total: Rupees 411');
        // cy.get('.stripe-button-el > span').click({force:true});
    
    })
})