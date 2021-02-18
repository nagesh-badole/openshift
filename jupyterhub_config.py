c.Spawner.args = [ '--NotebookApp.tornado_settings={"headers": {"Content-Security-Policy": "frame-ancestors * self "}}']
c.JupyterHub.tornado_settings = {'headers': {'Content-Security-Policy': "frame-ancestors * 'self' "}}
c.GatewayClient.request_timeout = 600.0
c.JupyterApp.log_levelany = 50
c.Application.log_levelany = 50
c.Spawner.default_url = '/lab'
