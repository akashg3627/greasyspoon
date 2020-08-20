import React from 'react';
function RenderMenuItem({ dish, deleteFavorite }) {
    return(
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + dish.image} alt={dish.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{dish.name}</Media>
                <p>{dish.description}</p>
                <Button outline color="danger" onClick={() => deleteFavorite(dish._id)}>
                    <span className="fa fa-times"></span>
                </Button>
            </Media>
        </Media>
    );
}
function OrderPanel(props) {
    const orders = props.orders.dishes.map((dish) => {
        return (
            <div key={dish._id} className="col-12 mt-5">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });
    const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

    return (
        <div className="container">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Active Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Pending Orders
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
                <div className="row">
                    <Media list>
                        {orders}
                    </Media>
                </div>
        </TabPane>
        <TabPane tabId="2">
                <div className="row">
                    <Media list>
                        {orders}
                    </Media>
                </div>
        </TabPane>
      </TabContent>
    </div>  
    );
}

export default OrderPanel;