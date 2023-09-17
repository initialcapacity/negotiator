class AllowedEmails:
    def __init__(self, domains: str, addresses: str):
        self.domains = [] if domains == '' else domains.split(',')
        self.addresses = [] if addresses == '' else addresses.split(',')

    def include(self, email: str) -> bool:
        if len(self.domains) == 0 and len(self.addresses) == 0:
            return True

        for domain in self.domains:
            if email.split('@')[-1] == domain:
                return True

        for address in self.addresses:
            if address == email:
                return True

        return False
