import * as React from 'react';

type WithFetchState = {
	loading: boolean,
	data: any
};

const withFetch: (url: string) => (v: any) => React.Component<{}, WithFetchState> = (url) => (View: any) => {
	return class WithFetch extends React.Component<{}, WithFetchState> {
	  constructor(props: any) {
			super(props);
	    this.state = {
	      loading: true,
	      data: null
	    };
			this.getIt = this.getIt.bind(this);
	  }
	  componentDidMount() {
			this.getIt();
		}
		getIt(){
			fetch(url).then(r => r.json()).then(data => {
        this.setState({
					loading: false,
					data: data
				});
	    });
		}
		render() {
			console.log('wuuuu: ', this.state);
			if(this.state.loading) {
	      return (
	        <div>loading</div>
	      );
	    } else {
	      return <View data={this.state.data} refetch={this.getIt} />
	    }
	  }
	} as any
};

export default withFetch;
